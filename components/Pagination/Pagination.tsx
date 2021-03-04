import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Paper } from '../Paper';
import { Button } from '../Button';

import './style.scss';

/**
 * @type {Number}
 */
const ONE = 1;

/**
 * @interface
 */
interface PaginationProps {
    classes?: string[];
    onClick?: (value: number) => void;
    activePage: number;
    pagesCount: number;
    withFirstAndLast?: boolean;
    withPrevAndNext?: boolean;
}

class Pagination extends Component<PaginationProps>
{
    static defaultProps = {
        activePage: 1,
        withFirstAndLast: true,
        withPrevAndNext: true
    };

    /**
     * @returns {Array}
     */
    private getClasses = (): string[] =>
    {
        const { classes } = this.props;
        let paginationClasses = ['pmd-pagination'];

        if (classes) {
            paginationClasses = [...paginationClasses, ...classes];
        }

        return paginationClasses;
    };

    /**
     * @param {Number} pagesCount
     *
     * @returns {Array}
     */
    private range = (pagesCount: number): number[] =>
    {
        let pages: number[] = [];

        for (let page=0; page<pagesCount; page++ ) {
            pages = [...pages, page + ONE];
        }

        return pages;
    };

    /**
     * @returns {Array}
     */
    private renderPages = (): JSX.Element[] =>
    {
        const { pagesCount, activePage, onClick } = this.props;
        const pages = this.range(pagesCount);

        return pages.map(page => (
            <Button key={page} autoWidth plainText classes={[activePage === page ? 'active' : '']}
                onClick={() => onClick && onClick(page)}>
                {page}
            </Button>
        ));
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        const { activePage, pagesCount, withFirstAndLast, withPrevAndNext, onClick } = this.props;

        return (
            <Paper classes={this.getClasses()} testId="pmd-pagination">
                { withFirstAndLast &&
                    <Button autoWidth plainText disabled={activePage === ONE} onClick={() => onClick && onClick(ONE)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </Button> }
                { withPrevAndNext &&
                    <Button autoWidth plainText disabled={activePage === ONE}
                        onClick={() => onClick && onClick(activePage - ONE)} >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </Button> }
                {this.renderPages()}
                { withPrevAndNext &&
                    <Button autoWidth plainText disabled={activePage === pagesCount}
                        onClick={() => onClick && onClick(activePage + ONE)} >
                        <FontAwesomeIcon icon={faCaretRight} />
                    </Button> }
                { withFirstAndLast &&
                    <Button autoWidth plainText disabled={activePage === pagesCount}
                        onClick={() => onClick && onClick(pagesCount)}>
                        <FontAwesomeIcon icon={faForward} />
                    </Button> }
            </Paper>
        );
    }
}

export default Pagination;