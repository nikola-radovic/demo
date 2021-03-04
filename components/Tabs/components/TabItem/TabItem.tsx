import React, { Component, ReactNode } from 'react';
import { Typography } from '../../../Typography';
import { TabsContext } from '../../Tabs';

import './style.scss';

/**
 * @interface
 */
interface TabItemProps {
    children?: ReactNode;
    classes?: string[];
    tabKey: string;
    title: string;
    divider?: boolean;
    disabled?: boolean;
}

/**
 * @class ./themes/default/Tabs/components/TabItem
 */
export class TabItem extends Component<TabItemProps>
{
    static contextType = TabsContext;

    static defaultProps = {
        divider: true,
        disabled: false
    };

    /**
     * @override
     */
    componentDidMount(): void
    {
        const { children, tabKey } = this.props;
        const { onInitialContent } = this.context;

        onInitialContent(tabKey, children);
    }

    /**
     * Handles tab item click.
     */
    private handleClick = (): void =>
    {
        const { onChange } = this.context;
        const { tabKey, children, disabled } = this.props;

        if (!disabled) {
            onChange(tabKey, children);
        }
    }

    /**
     * @returns {Array}
     */
    private getClasses = (): string[] =>
    {
        const { classes, tabKey, divider, disabled } = this.props;
        const { activeKey } = this.context;

        let tabItemClasses = ['pmd-tab-item'];

        if (activeKey === tabKey) {
            tabItemClasses = [...tabItemClasses, 'active'];
        }
        if (divider) {
            tabItemClasses = [...tabItemClasses, 'pmd-tab-item__divider'];
        }
        if (disabled) {
            tabItemClasses = [...tabItemClasses, 'pmd-tab-item__disabled'];
        }
        if (classes) {
            tabItemClasses = [...tabItemClasses, ...classes];
        }

        return tabItemClasses;
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        const { title } = this.props;
        const { variant } = this.context;

        return (
            <Typography
                variant={variant}
                classes={this.getClasses()}
                inline
                autoWidth
                onClick={this.handleClick}
            >
                {title}
            </Typography>
        );
    }
}