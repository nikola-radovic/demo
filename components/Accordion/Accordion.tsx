import React, { Component } from 'react';
import { Paper } from '../Paper';

/**
 * @interface
 */
interface AccordionProps {
    classes?: string[];
}

/**
 * @class ./themes/default/Accordion
 */
export class Accordion extends Component<AccordionProps>
{
    /**
     * @returns {Array}
     */
    private getClasses = (): string[] =>
    {
        const { classes } = this.props;
        let accordionClasses = ['pmd-accordion'];

        if (classes) {
            accordionClasses = [...accordionClasses, ...classes];
        }

        return accordionClasses;
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        return (
            <Paper testId="pmd-accordion" classes={this.getClasses()}>
                {this.props.children}
            </Paper>
        );
    }
}