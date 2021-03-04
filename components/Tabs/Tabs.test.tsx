import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';
import { TabItem } from './components/TabItem';

/**
 * @type {Object}
 */
const mockTabsProps = {
    activeKey: '1',
    onSelect: () => {}
};

afterEach(cleanup);

describe('Tabs tests', () => {
    test('should render correctly', () => {
        const { container, getByTestId } = render(<Tabs {...mockTabsProps} />);

        expect(container).toMatchSnapshot();
        expect(getByTestId('pmd-tabs')).toBeInTheDocument();
        expect(getByTestId('pmd-tabs')).toHaveClass('pmd-tabs');
    });

    test('should render with provided classes', () => {
        const { getByTestId, rerender } = render(<Tabs {...mockTabsProps} />);

        expect(getByTestId('pmd-tabs')).not.toHaveClass('test-class');
        rerender(<Tabs {...mockTabsProps} classes={['test-class']} />);
        expect(getByTestId('pmd-tabs')).toHaveClass('test-class');
    });

    test('triggers change event', () => {
        const mockOnSelect = jest.fn();
        const { getByText } = render(
            <Tabs activeKey="1" onSelect={mockOnSelect}>
                <TabItem tabKey="1" title="Tab 1" disabled>Content of Tab Pane 1</TabItem>
                <TabItem tabKey="2" title="Tab 2">Content of Tab Pane 2</TabItem>
            </Tabs>
        );

        expect(getByText(/tab 1/i)).toBeInTheDocument();
        expect(getByText(/tab 2/i)).toBeInTheDocument();
        expect(getByText(/content of tab pane 1/i)).toBeInTheDocument();

        fireEvent.click(getByText(/tab 2/i));

        expect(mockOnSelect).toHaveBeenCalledTimes(1);

        fireEvent.click(getByText(/tab 1/i));
        fireEvent.click(getByText(/tab 1/i));
        fireEvent.click(getByText(/tab 1/i));

        expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
});