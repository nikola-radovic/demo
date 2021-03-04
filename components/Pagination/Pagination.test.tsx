import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

afterEach(cleanup);

describe('Pagination tests', () => {
    test('should render correctly', () => {
        const { container, getByTestId } = render(<Pagination pagesCount={1} />);

        expect(container).toMatchSnapshot();
        expect(getByTestId('pmd-pagination')).toBeInTheDocument();
        expect(getByTestId('pmd-pagination')).toHaveClass('pmd-pagination');
    });

    test('should render with provided classes', () => {
        const { getByTestId, rerender } = render(<Pagination pagesCount={1} />);

        expect(getByTestId('pmd-pagination')).not.toHaveClass('test-class');
        rerender(<Pagination pagesCount={1} classes={['test-class']}/>);
        expect(getByTestId('pmd-pagination')).toHaveClass('test-class');
    });

    test('should render properly with default props provided', () => {
        const { getAllByRole } = render(<Pagination pagesCount={1} />);

        expect(getAllByRole('button').length).toBe(5);
        expect(getAllByRole('button')[0]).toBeDisabled();
        expect(getAllByRole('button')[1]).toBeDisabled();
        expect(getAllByRole('button')[2]).toHaveClass('active');
        expect(getAllByRole('button')[3]).toBeDisabled();
        expect(getAllByRole('button')[4]).toBeDisabled();
    });

    test('should render with only page buttons', () => {
        const { getAllByRole } = render(
            <Pagination pagesCount={3} withFirstAndLast={false} withPrevAndNext={false} />
        );

        expect(getAllByRole('button').length).toBe(3);
    });

    test('should trigger click event on page button clicked', () => {
        const mockOnClick = jest.fn();
        const { getAllByRole, getByRole } = render(
            <Pagination pagesCount={1} withFirstAndLast={false} withPrevAndNext={false} onClick={mockOnClick} />
        );

        expect(getByRole('button')).toBeInTheDocument();
        expect(getAllByRole('button').length).toBe(1);

        fireEvent.click(getByRole('button'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('should trigger click event on first button clicked', async () => {
        const mockOnClick = jest.fn();
        const { getAllByRole, rerender } = render(<Pagination activePage={1} pagesCount={2} onClick={mockOnClick} />);

        fireEvent.click(getAllByRole('button')[0]);
        expect(mockOnClick).toHaveBeenCalledTimes(0);
        rerender(<Pagination activePage={2} pagesCount={2} onClick={mockOnClick} />);
        fireEvent.click(getAllByRole('button')[0]);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('should trigger click event on previous button clicked', async () => {
        const mockOnClick = jest.fn();
        const { getAllByRole, rerender } = render(<Pagination activePage={1} pagesCount={2} onClick={mockOnClick} />);

        fireEvent.click(getAllByRole('button')[1]);
        expect(mockOnClick).toHaveBeenCalledTimes(0);
        rerender(<Pagination activePage={2} pagesCount={2} onClick={mockOnClick} />);
        fireEvent.click(getAllByRole('button')[1]);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('should trigger click event on next button clicked', async () => {
        const mockOnClick = jest.fn();
        const { getAllByRole, rerender } = render(<Pagination activePage={2} pagesCount={2} onClick={mockOnClick} />);

        fireEvent.click(getAllByRole('button')[4]);
        expect(mockOnClick).toHaveBeenCalledTimes(0);
        rerender(<Pagination activePage={1} pagesCount={2} onClick={mockOnClick} />);
        fireEvent.click(getAllByRole('button')[4]);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('should trigger click event on last button clicked', async () => {
        const mockOnClick = jest.fn();
        const { getAllByRole, rerender } = render(<Pagination activePage={2} pagesCount={2} onClick={mockOnClick} />);

        fireEvent.click(getAllByRole('button')[5]);
        expect(mockOnClick).toHaveBeenCalledTimes(0);
        rerender(<Pagination activePage={1} pagesCount={2} onClick={mockOnClick} />);
        fireEvent.click(getAllByRole('button')[5]);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});