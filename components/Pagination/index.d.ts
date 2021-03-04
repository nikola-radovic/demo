import * as React from 'react';

export function Pagination(props: PaginationProps): JSX.Element;

interface PaginationProps {
    children?: React.ReactNode;
    classes?: string[];
    onClick?: () => void;
    activePage?: number;
    pagesCount: number;
    withFirstAndLast?: boolean;
    withPrevAndNext?: boolean;
}