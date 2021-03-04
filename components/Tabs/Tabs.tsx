import React, { Component, ReactNode, createContext } from 'react';
import { Paper } from '../Paper';

/**
 * @type {String}
 */
type VariantType = 'h1' | 'body-regular-12' | 'body-regular-14' | 'body-regular-16' | 'body-regular-18' |
    'body-medium-16' | 'body-medium-18' | 'body-medium-24' | 'body-bold-18';

/**
 * @interface
 */
interface TabsContext {
    activeKey: string;
    variant?: VariantType;
    onChange: (value: string, content: ReactNode | null) => void ;
    onInitialContent: (value: string, content: ReactNode | null) => void ;
}

/**
 * @interface
 */
interface TabsProps {
    children?: ReactNode;
    classes?: string[];
    activeKey: string;
    variant?: VariantType;
    onSelect: (value: string) => void;
}

/**
 * @interface
 */
interface TabsState {
    content: ReactNode | null;
}

/**
 * @type {Object}
 */
export const TabsContext = createContext<TabsContext | null>(null);

/**
 * @class ./themes/default/Tabs
 */
export class Tabs extends Component<TabsProps, TabsState>
{
    static defaultProps = {
        variant: 'body-medium-18'
    };

    /**
     * @override
     */
    constructor(props: TabsProps)
    {
        super(props);

        this.state = {
            content: null
        };
    }

    /**
     * @param {String} value
     * @param {JSX.Element | null} content
     */
    private handleInitialContent = (value: string, content: ReactNode | null): void =>
    {
        if (value === this.props.activeKey) {
            this.setState({ content });
        }
    };

    /**
     * @param {String} tabKey
     * @param {JSX.Element | null} content
     */
    private handleChange = (tabKey: string, content: ReactNode | null): void =>
    {
        this.setState({ content });

        this.props.onSelect(tabKey);
    };

    /**
     * @returns {Array}
     */
    private getClasses = (): string[] =>
    {
        const { classes } = this.props;
        let tabsClasses = ['pmd-tabs'];

        if (classes) {
            tabsClasses = [...tabsClasses, ...classes];
        }

        return tabsClasses;
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        const { children, activeKey, variant } = this.props;
        const { content } = this.state;
        const value = {
            activeKey,
            variant,
            onChange: this.handleChange,
            onInitialContent: this.handleInitialContent
        };

        return (
            <TabsContext.Provider value={value}>
                <Paper classes={this.getClasses()} testId="pmd-tabs">
                    <Paper classes={['pmd-tabs__items']}>{children}</Paper>
                    <Paper classes={['pmd-tabs__content']}>{content}</Paper>
                </Paper>
            </TabsContext.Provider>
        );
    }
}