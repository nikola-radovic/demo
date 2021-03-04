import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import Dropdown from './Dropdown';

const dropdownItems = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
];

const dropdownLinkItems = [
    { name: 'Layout', href: '/layout' },
    { name: 'Inputs', href: '/inputs' },
    { name: 'Navigation', href: '/navigation' }
];

const RouterComponent = () => (
    <React.Fragment>
        <Dropdown title="Select Item" items={dropdownLinkItems} />
        <Switch>
            <Route path="/layout">
                <h1>Layout Page</h1>
            </Route>
            <Route path="/inputs">
                <h1>Inputs Page</h1>
            </Route>
            <Route path="/navigation">
                <h1>Navigation Page</h1>
            </Route>
        </Switch>
    </React.Fragment>
);

afterEach(cleanup);

describe('Dropdown tests: ', () => {
    test('it should render', () => {
        const { container, getByText, getByTestId, getAllByTestId } = render(<Dropdown title="Select Item" items={dropdownItems} />);

        expect(container).toMatchSnapshot();
        expect(getByText('Select Item')).toBeInTheDocument();
        expect(getByTestId('pmd-dropdown__content').childNodes).toHaveLength(3);
        getAllByTestId('pmd-dropdown__content-item').forEach(item => {
            expect(item).toBeInTheDocument();
            expect(item.tagName).not.toBe('A');
            expect(item.tagName).toBe('DIV');
        });
    });

    test('it should fire onClick event', () => {
        const mockOnClick = jest.fn();
        const { getAllByTestId } = render(<Dropdown title="Select Item" items={dropdownItems} onClick={mockOnClick} />);

        getAllByTestId('pmd-dropdown__content-item').forEach(item => {
            fireEvent.click(item);
        });
        expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    test('it should be NavLink instead of div', () => {
        const history = createMemoryHistory();
        const { getAllByTestId, getByText } = render(
            <Router history={history}>
                <RouterComponent />
            </Router>
        );

        getAllByTestId('pmd-dropdown__content-item').forEach((item, index) => {
            expect(item).toBeInTheDocument();
            expect(item.tagName).not.toBe('DIV');
            expect(item.tagName).toBe('A');
            expect(item).toHaveAttribute('href');

            if (index === 1) {
                fireEvent.click(item, { button: 0 });
                expect(getByText('Inputs Page')).toBeInTheDocument();
            }
        });
    });

    test('it should render with provided classes', () => {
        const { getByTestId } = render(<Dropdown title="Select Item" items={dropdownItems} classes={['test-class-1']} />);

        expect(getByTestId('pmd-dropdown')).toHaveClass('test-class-1');
    });
});