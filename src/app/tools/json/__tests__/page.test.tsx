import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

// Mock file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

// Mock jsonrepair
jest.mock('jsonrepair', () => ({
  jsonrepair: jest.fn((str) => str),
}));

describe('JSON Tools Page', () => {
  const sampleJSON = '{"name": "John", "age": 30}';
  const invalidJSON = '{"name": "John", age: 30}';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the compact JSON workspace', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: 'JSON Tools' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'text' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'tree' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Format' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Minify' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Load from URL')).toBeInTheDocument();
  });

  it('loads sample JSON when clicking the sample button', async () => {
    render(<Page />);
    const sampleButton = screen.getByTitle('Load sample JSON');
    fireEvent.click(sampleButton);
    
    const editor = screen.getByTestId('monaco-editor');
    await waitFor(() => {
      expect((editor as HTMLTextAreaElement).value).toContain('"name"');
    });
  });

  it('validates JSON input', async () => {
    render(<Page />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: sampleJSON } });
    fireEvent.click(screen.getByRole('button', { name: 'Format' }));
    
    await waitFor(() => {
      expect(editor).toHaveValue('{\n  "name": "John",\n  "age": 30\n}');
      expect(screen.queryByText(/Invalid JSON/i)).not.toBeInTheDocument();
    });
  });

  it('shows error for invalid JSON', async () => {
    render(<Page />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: invalidJSON } });
    fireEvent.click(screen.getByRole('button', { name: 'Format' }));
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid JSON/i)).toBeInTheDocument();
    });
  });

  it('minifies JSON input', async () => {
    render(<Page />);
    
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: '{\n  "name": "John",\n  "age": 30\n}' } });
    fireEvent.click(screen.getByRole('button', { name: 'Minify' }));

    await waitFor(() => {
      expect(editor).toHaveValue('{"name":"John","age":30}');
    });
  });

  it('shows parsed JSON in tree view with searchable details', async () => {
    render(<Page />);

    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: sampleJSON } });
    fireEvent.click(screen.getByRole('tab', { name: 'tree' }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search keys and values')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search keys and values'), { target: { value: 'John' } });
    expect(screen.getByText(/matches/)).toBeInTheDocument();
    expect(document.body.textContent).toContain('"John"');
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('clears the editor when clicking clear button', async () => {
    render(<Page />);
    
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: sampleJSON } });
    
    const clearButton = screen.getByTitle('Clear input');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Select a node')).toBeInTheDocument();
    });
  });
}); 
