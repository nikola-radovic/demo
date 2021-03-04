import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Accordion } from './Accordion';
import { AccordionItem } from './components/AccordionItem';

const AccordionComponent = (props: { classes: string[] }) => {
    return (
        <Accordion classes={props.classes}>
            <AccordionItem title='Accordion Item 1' />
            <AccordionItem title='Accordion Item 2' />
            <AccordionItem title='Accordion Item 3' />
        </Accordion>
    );
};

afterEach(cleanup);

describe('Accordion tests: ', () => {
    test('it should render', () => {
        const { container, getAllByTestId } = render(<AccordionComponent classes={[]} />);

        expect(container).toMatchSnapshot();
        expect(getAllByTestId('pmd-accordion-item')).toHaveLength(3);
    });

    test('it should add class', () => {
        const { getByTestId } = render(<AccordionComponent classes={['test-class-1 test-class-2']} />)

        expect(getByTestId('pmd-accordion')).toHaveClass('test-class-1', 'test-class-2');
    });
});