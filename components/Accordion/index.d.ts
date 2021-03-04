import * as React from 'react';

export function Accordion(props: AccordionProps): JSX.Element;
export function AccordionItem(props: AccordionItemProps): JSX.Element;

interface AccordionProps {
    children?: React.ReactNode;
    classes?: string[];
}

interface AccordionItemProps {
    children?: React.ReactNode;
    title: string,
    active?: boolean
}
