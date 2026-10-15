import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import APITester from '../page';

jest.mock('next-auth/react', () => ({ useSession: () => ({ data: null, status: 'unauthenticated' }), signIn: jest.fn(), signOut: jest.fn() }));
jest.mock('next/dynamic', () => () => function EditorMock() { return <div data-testid="editor" />; });
const collection = { id: 'local-qa-save', name: 'QA saves', requests: [], createdAt: 1, updatedAt: 1 };

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('api-collections', JSON.stringify([collection]));
});

it('keeps the first saved request linked so later saves update it without duplicates', async () => {
  render(<APITester />);
  await waitFor(() => expect(screen.getByTitle('Save request')).toBeInTheDocument());
  fireEvent.change(screen.getByPlaceholderText('Enter URL or paste text'), { target: { value: 'https://example.com/first' } });
  fireEvent.click(screen.getByTitle('Save request'));
  fireEvent.change(screen.getByPlaceholderText('e.g., Get User Profile'), { target: { value: 'Saved once' } });
  fireEvent.change(screen.getByPlaceholderText('e.g., Auth flows'), { target: { value: 'QA folder' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Request', exact: true }));
  await waitFor(() => expect(screen.queryByText('Save Request to Collection')).not.toBeInTheDocument());
  fireEvent.change(screen.getByPlaceholderText('Enter URL or paste text'), { target: { value: 'https://example.com/second' } });
  fireEvent.click(screen.getByTitle('Save request'));
  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('api-collections') || '[]');
    expect(stored[0].requests).toHaveLength(1);
    expect(stored[0].requests[0]).toMatchObject({ name: 'Saved once', folder: 'QA folder', url: 'https://example.com/second' });
  });
  expect(screen.queryByText('Save Request to Collection')).not.toBeInTheDocument();
});

const savedRequest = {
  id: 'local-existing-request', name: 'Existing request', method: 'GET', url: 'https://example.com/original',
  headers: [{ key: 'Authorization', value: 'Bearer test-only-placeholder', enabled: true }],
  body: '', contentType: 'application/json', authConfig: { type: 'bearer', token: 'test-only-placeholder' },
  folder: 'Keep folder', description: 'Keep description', createdAt: 1, updatedAt: 1,
};
function seedSavedTab() {
  localStorage.setItem('api-collections', JSON.stringify([{ ...collection, requests: [savedRequest] }]));
  localStorage.setItem('apiTesterTabs', JSON.stringify([{ ...savedRequest, id: 'tab-existing', savedCollectionId: collection.id, savedRequestId: savedRequest.id, response: null, responseMetrics: null, hasUnsavedChanges: false }]));
  localStorage.setItem('apiTesterActiveTabIndex', '0');
}

it('preserves normal-mode auth, folder and description when updating a loaded saved request', async () => {
  seedSavedTab();
  render(<APITester />);
  await waitFor(() => expect(screen.getByPlaceholderText('Enter URL or paste text')).toHaveValue(savedRequest.url));
  fireEvent.change(screen.getByPlaceholderText('Enter URL or paste text'), { target: { value: 'https://example.com/updated' } });
  fireEvent.click(screen.getByTitle('Save request'));
  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('api-collections') || '[]')[0].requests;
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ ...savedRequest, updatedAt: expect.any(Number), url: 'https://example.com/updated' });
  });
});

it('detaches a duplicate tab from the original saved request', async () => {
  seedSavedTab();
  render(<APITester />);
  await waitFor(() => expect(screen.getByPlaceholderText('Enter URL or paste text')).toHaveValue(savedRequest.url));
  fireEvent.keyDown(document, { key: 'd', ctrlKey: true });
  fireEvent.click(screen.getByTitle('Save request'));
  expect(screen.getByText('Save Request to Collection')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('e.g., Get User Profile')).toHaveValue('Existing request (Copy)');
});

it('opens Save As rather than silently updating a deleted request', async () => {
  seedSavedTab();
  localStorage.setItem('api-collections', JSON.stringify([collection]));
  render(<APITester />);
  await waitFor(() => expect(screen.getByPlaceholderText('Enter URL or paste text')).toHaveValue(savedRequest.url));
  fireEvent.click(screen.getByTitle('Save request'));
  expect(screen.getByText('Save Request to Collection')).toBeInTheDocument();
});
