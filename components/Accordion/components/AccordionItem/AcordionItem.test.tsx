import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AccordionItem } from './AccordionItem';

afterEach(cleanup);

describe('AccordionItem tests: ', () => {
    test('it should render', () => {
        const { container, getByText, getByTestId } = render(<AccordionItem title='Accordion Test Item' />);

        expect(container).toMatchSnapshot();
        expect(getByText('Accordion Test Item')).toBeInTheDocument();
        expect(getByTestId('pmd-accordion-item')).not.toHaveClass('pmd-accordion-item--expanded');
    });

    test('it should become active on click', () => {
        const { getByTestId } = render(<AccordionItem title='Accordion Test Item' />);

        fireEvent.click(getByTestId('pmd-accordion-item-header'));
        expect(getByTestId('pmd-accordion-item')).toHaveClass('pmd-accordion-item--expanded');
    });

    test('it should collapse on click if active', () => {
        const { getByTestId } = render(<AccordionItem title='Accordion Test Item' active />);

        expect(getByTestId('pmd-accordion-item')).toHaveClass('pmd-accordion-item--expanded');
        fireEvent.click(getByTestId('pmd-accordion-item-header'));
        expect(getByTestId('pmd-accordion-item')).not.toHaveClass('pmd-accordion-item--expanded');
    });
});