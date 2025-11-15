import React from 'react';
import { render, screen } from '@testing-library/react';
import RootCauseAnalysis from '../components/analysis/RootCauseAnalysis';
import '@testing-library/jest-dom';
import { MOCK_FAULT_TREE_DATA } from '../constants';

jest.mock('../components/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid="icon">{name}</div>,
}));

jest.mock('react-d3-tree', () => ({
  __esModule: true,
  default: ({ data }: { data: any }) => <div data-testid="tree">{JSON.stringify(data)}</div>,
}));

describe('RootCauseAnalysis', () => {
  const title = 'Root Cause Analysis';
  const description = 'A structured process to determine the fundamental reason a failure occurred.';

  it('renders the title and description', () => {
    render(<RootCauseAnalysis title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders the Tree component with the correct data', () => {
    render(<RootCauseAnalysis title={title} description={description} />);

    const tree = screen.getByTestId('tree');
    expect(tree).toHaveTextContent(JSON.stringify(MOCK_FAULT_TREE_DATA));
  });

  it('renders the correct icon', () => {
    render(<RootCauseAnalysis title={title} description={description} />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveTextContent('Search');
  });
});
