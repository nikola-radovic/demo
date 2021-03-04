import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const mockOnChange = jest.fn();

afterEach(cleanup);

describe('Input tests: ', () => {
    test('it should render', async () => {
        const { container, getByRole, getByTestId, rerender, queryByTestId } = render(
            <Input name="test-input" onChange={mockOnChange} />
        );

        expect(container).toMatchSnapshot();
        expect(getByTestId('pmd-input')).toHaveClass('pmd-input-wrapper');
        expect(getByRole('textbox').getAttribute('type')).toBe('text');
        expect(getByRole('textbox').getAttribute('id')).toBe('test-input');
        expect(getByRole('textbox').getAttribute('name')).toBe('test-input');
        expect(getByRole('textbox').getAttribute('value')).toBe('');
        expect(getByRole('textbox')).not.toBeDisabled();
        await userEvent.type(getByRole('textbox'), 'User typed here...');
        expect(mockOnChange).toHaveBeenCalledTimes(18);
        expect(queryByTestId('pmd-input-label')).not.toBeInTheDocument();
        rerender(<Input name="test-input" onChange={mockOnChange} label="Test input label" />);
        expect(getByTestId('pmd-input-label')).toBeInTheDocument();
    });

    test('it should be of appropriate type', () => {
        const { getByTestId, getByText } = render(
            <Input name="test-input"
                   onChange={mockOnChange}
                   type="file"
                   fileText="Test file text"
                   fileButtonText="Test file button text" />
        );

        expect(getByTestId('pmd-input')).toHaveClass('pmd-input-wrapper--file');
        expect(getByText('Test file text')).toBeInTheDocument();
        expect(getByText('Test file button text')).toBeInTheDocument();
    });

    test('it should be disabled', () => {
        const { getByTestId, getByRole } = render(<Input name="test-input" onChange={mockOnChange} disabled />);

        expect(getByTestId('pmd-input')).toHaveClass('pmd-input-wrapper--disabled');
        expect(getByRole('textbox')).toBeDisabled();
    });

    test('it should render with search area', () => {
        const { getByTestId, rerender } = render(
            <Input name="test-input"
                   onChange={mockOnChange}
                   type="file"
                   fileText="Test file text"
                   fileButtonText="Test file button text"
                   withSearch />
        );

        expect(getByTestId('pmd-input')).not.toHaveClass('pmd-input-wrapper--search');
        rerender(<Input name="test-input" onChange={mockOnChange} withSearch />);
        expect(getByTestId('pmd-input')).toHaveClass('pmd-input-wrapper--search');
        expect(getByTestId('pmd-input-search')).toBeInTheDocument();
    });

    test('it should render with provided classes', () => {
        const { getByTestId } = render(<Input name="test-input" onChange={mockOnChange} classes={['test-class-1']} />);

        expect(getByTestId('pmd-input')).toHaveClass('test-class-1');
    });
});