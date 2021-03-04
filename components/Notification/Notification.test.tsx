import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Notification from './Notification';

afterEach(cleanup);

describe('Notification tests', () => {
    test('should render correctly', async () => {
        const mockOnClose = jest.fn();
        const { getByTestId, getByText } = render(
            <Notification onClose={mockOnClose} message="message"><div>Notification test</div></Notification>
        );

        expect(getByTestId('pmd-notification-root')).toBeInTheDocument();
        expect(getByTestId('pmd-notification-root')).toHaveClass('pmd-notification-root--right');
        expect(getByTestId('pmd-notification-container')).toHaveClass('pmd-notification');
        expect(getByText(/notification test/i)).toBeInTheDocument();
    });

    test('should render with provided classes', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <Notification onClose={mockOnClose} message="message" status="info" classes={['test-class']} />
        );

        expect(getByTestId('pmd-notification-container')).toHaveClass('test-class');
    });

    test('should render without status icon if status prop not provided', () => {
        const mockOnClose = jest.fn();
        const { queryByTestId } = render(
            <Notification onClose={mockOnClose} message="message" />
        );

        expect(queryByTestId('pmd-notification-status-icon')).not.toBeInTheDocument();
    });

    test('should render with info status icon', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <Notification onClose={mockOnClose} message="message" status="info" />
        );

        expect(getByTestId('font-awesome-info')).toBeInTheDocument();
    });

    test('should render with success status icon', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <Notification onClose={mockOnClose} message="message" status="success" />
        );

        expect(getByTestId('font-awesome-check')).toBeInTheDocument();
    });

    test('should render with warning status icon', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <Notification onClose={mockOnClose} message="message" status="warning" />
        );

        expect(getByTestId('font-awesome-exclamation')).toBeInTheDocument();
    });

    test('should render with danger status icon', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <Notification onClose={mockOnClose} message="message" status="danger" />
        );

        expect(getByTestId('font-awesome-times')).toBeInTheDocument();
    });

    test('should render with center position prop provided', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <Notification onClose={mockOnClose} message="message" status="danger" position="center"/>
        );

        expect(getByTestId('pmd-notification-root')).toHaveClass('pmd-notification-root--center');
    });

    test('should trigger click event if closable prop set to true', () => {
        const mockOnClose = jest.fn();
        const { getByTestId, getByText } = render(
            <Notification onClose={mockOnClose} message="message" closable={true} status="info"/>
        );

        fireEvent.click(getByTestId('pmd-notification-close-icon'));

        expect(getByTestId('pmd-notification-close-icon')).toBeInTheDocument();
    });
});