import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

describe('Button tests: ', () => {
    test('it should render', () => {
        const { container, getByRole } = render(<Button />)

        expect(container).toMatchSnapshot();
        expect(getByRole('button')).toHaveClass('pmd-btn');
        expect(getByRole('button')).not.toBeDisabled();
    });

    test('it should render disabled button', () => {
        const { getByRole } = render(<Button disabled />);

        expect(getByRole('button')).toBeDisabled();
    });

    test('it should render button with auto width', () => {
        const { getByRole } = render(<Button autoWidth />);

        expect(getByRole('button')).toHaveClass('pmd-btn--auto-width');
    });

    test('it should render "plainText" button', () => {
        const { getByRole } = render(<Button plainText />);

        expect(getByRole('button')).toHaveClass('pmd-btn--plain-text');
    });

    test('it should render button with provided classes', () => {
        const { getByRole } = render(<Button classes={['test-class-1', 'test-class-2']} />);

        expect(getByRole('button')).toHaveClass('test-class-1', 'test-class-2');
    });
});