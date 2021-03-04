import React, { Component } from 'react';
import { Paper } from '../../../Paper';
import { Typography } from '../../../Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

/* Line 54 - no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @interface
 */
interface AccordionItemProps {
    title: string,
    active?: boolean
}

/**
 * @class ./themes/default/Accordion/components/AccordionItem
 */
export class AccordionItem extends Component<AccordionItemProps>
{
    static defaultProps = {
        active: false
    };

    /**
     * @returns {Array}
     */
    private getClasses = (): string[] =>
    {
        const { active } = this.props;
        const accordionItemClasses = ['pmd-accordion-item'];

        if (active) {
            accordionItemClasses.push('pmd-accordion-item--expanded');
        }

        return accordionItemClasses;
    };

    /**
     * @param {Object} currentTarget
     */
    private expand = ({ currentTarget }: React.MouseEvent): void =>
    {
        const parrent = currentTarget.parentElement;
        const grandParrent = parrent && parrent.parentElement;
        const items = grandParrent && grandParrent.getElementsByClassName('pmd-accordion-item');

        if (items) {
            for (const item of items as any) {
                if ((item !== parrent) || (parrent && parrent.classList.contains('pmd-accordion-item--expanded'))) {
                    item.classList.remove('pmd-accordion-item--expanded');
                } else if (parrent && !parrent.classList.contains('pmd-accordion-item--expanded')) {
                    parrent.classList.add('pmd-accordion-item--expanded');
                }
            }
        }
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        const { title, children } = this.props;

        return (
            <Paper testId="pmd-accordion-item" classes={this.getClasses()}>
                <Paper testId="pmd-accordion-item-header" classes={['pmd-accordion-item__header']}
                    onClick={this.expand}>
                    <Typography variant="body-medium-18" inline autoWidth noWrap truncate>{title}</Typography>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Paper>
                <Paper classes={['pmd-accordion-item__content']}>
                    {children}
                </Paper>
            </Paper>
        );
    }
}