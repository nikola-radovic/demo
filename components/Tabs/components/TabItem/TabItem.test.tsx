import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { TabItem } from './TabItem';
import { Tabs } from '../../Tabs';

afterEach(cleanup);

describe('TabItem tests', () => {
    test('should render correctly', () => {
        const mockOnSelect = jest.fn();
        const { container, getByText } = render(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1">Content of Tab Pane 1</TabItem>
            </Tabs>
        );

        expect(container).toMatchSnapshot();
        expect(getByText(/Tab 1/i)).toBeInTheDocument();
        expect(getByText(/Tab 1/i)).toHaveClass('pmd-tab-item');
        expect(getByText(/content of tab pane 1/i)).toBeInTheDocument();
        expect(getByText(/content of tab pane 1/i)).toHaveClass('pmd-tabs__content');
    });

    test('should render with provided classes', () => {
        const mockOnSelect = jest.fn();
        const { getByText, rerender } = render(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1">Content of Tab Pane 1</TabItem>
            </Tabs>
        );

        expect(getByText(/Tab 1/i)).not.toHaveClass('test-class');

        rerender(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1" classes={['test-class']}>Content of Tab Pane 1</TabItem>
            </Tabs>
        );

        expect(getByText(/Tab 1/i)).toHaveClass('test-class');
    });

    test('should render properly with disabled prop set to true', () => {
        const mockOnSelect = jest.fn();
        const { getByText } = render(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1" disabled>Content of Tab Pane 1</TabItem>
            </Tabs>
        );

        expect(getByText(/Tab 1/i)).toHaveClass('pmd-tab-item__disabled');
    });

    test('should render properly with divider prop set to false', () => {
        const mockOnSelect = jest.fn();
        const { getByText, rerender } = render(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1" divider={false}>Content of Tab Pane 1</TabItem>
            </Tabs>
        );

        expect(getByText(/Tab 1/i)).not.toHaveClass('pmd-tab-item__divider');

        rerender(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1" divider>Content of Tab Pane 1</TabItem>
            </Tabs>
        );

        expect(getByText(/Tab 1/i)).toHaveClass('pmd-tab-item__divider');
    });
});