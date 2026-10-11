import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card Component', () => {
  it('renders Card with default styles', () => {
    render(<Card>Test Content</Card>);
    const card = screen.getByText('Test Content');
    expect(card).toBeInTheDocument();
  });

  it('renders CardHeader with default styles', () => {
    render(<CardHeader>Header Content</CardHeader>);
    const header = screen.getByText('Header Content');
    expect(header).toBeInTheDocument();
  });

  it('renders CardTitle with default styles', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
  });

  it('renders CardDescription with default styles', () => {
    render(<CardDescription>Description</CardDescription>);
    const description = screen.getByText('Description');
    expect(description).toBeInTheDocument();
  });

  it('renders CardContent with default styles', () => {
    render(<CardContent>Content</CardContent>);
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  it('renders CardFooter with default styles', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    const footer = screen.getByText('Footer Content');
    expect(footer).toBeInTheDocument();
  });

  it('renders a complete Card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(<Card className="custom-class" data-testid="custom-card">Test Content</Card>);
    const card = screen.getByTestId('custom-card');
    expect(card).toHaveClass('custom-class');
  });
});
