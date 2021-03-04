import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle, faCheckCircle, faExclamationCircle,
    faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

/* Line 48 - init-declarations */
/* Line 53 - init-declarations */
/* eslint-disable init-declarations */

/**
 * @type {Number}
 */
const TIMEOUT = 250;

/**
 * @interface
 */
interface NotificationProps {
    message: string;
    status?: 'info' | 'success' | 'danger' | 'warning';
    position?: 'right' | 'center';
    timeout?: number;
    closable?: boolean;
    onClose: () => void;
    classes?: string[];
}

if (!document.getElementById('pmd-notification-root')) {
    const notificationRoot = document.createElement('div');

    notificationRoot.setAttribute('id', 'pmd-notification-root');
    notificationRoot.setAttribute('data-testid', 'pmd-notification-root');
    document.body.appendChild(notificationRoot);
}

/**
 * @type {HTMLElement}
 */
const notificationRoot = document.getElementById('pmd-notification-root');

/**
 * @type {Number}
 */
const defaultTimeout = 4500;

/**
 * @type {Number}
 */
let closeTimeout: number;

/**
 * @type {Number}
 */
let delayTimeout: number;

/**
 * @class ./themes/default/Notification
 */
class Notification extends Component<NotificationProps>
{
    static defaultProps = {
        position: 'right'
    };

    /**
     * @type {HTMLDivElement}
     */
    notification: HTMLDivElement;

    /**
     * @type {HTMLDivElement}
     */
    notificationDescription: HTMLDivElement;

    /**
     * @override
     *
     * @param {Object} props
     */
    constructor(props: NotificationProps)
    {
        super(props);

        window.clearTimeout(delayTimeout);
        window.clearTimeout(closeTimeout);

        this.setPosition();

        const notification = this.createNotificationContainer();
        const notificationContent = this.createNotificationContentContainer(notification);
        const notificationHeader = this.createNotificationHeaderContainer();

        this.createNotificationStatusIconContainer(notificationHeader);
        this.createNotificationTitleContainer(notificationContent, notificationHeader);
        const notificationDescription = this.createNotificationDescriptionContainer(notificationContent);

        this.createNotificationCloseIconContainer(notificationContent);

        this.notification = notification;
        this.notificationDescription = notificationDescription;
    }

    /**
     * @override
     */
    componentDidMount(): void
    {
        if (notificationRoot) {
            const { status, closable } = this.props;

            notificationRoot.appendChild(this.notification);

            if (closable) {
                const closeIconContainer = document.getElementById('pmd-notification__close-icon');

                ReactDOM.render(<FontAwesomeIcon icon={faTimes} />, closeIconContainer);
            }

            if (status) {
                const statusIconContainer = document.getElementById('pmd-notification__status-icon');

                ReactDOM.render(this.getStatusIcon(), statusIconContainer);
            }
            this.setTimer();
        }
    }

    /**
     * @override
     */
    componentWillUnmount(): void
    {
        if (notificationRoot) {
            notificationRoot.removeChild(this.notification);
        }
    }

    /**
     * @returns {HTMLDivElement}
     */
    private createNotificationContainer = (): HTMLDivElement =>
    {
        const notification = document.createElement('div');

        notification.classList.add(...this.getClasses(this.props));
        notification.setAttribute('data-testid', 'pmd-notification-container');

        return notification;
    };

    /**
     * @param {HTMLDivElement} notification
     *
     * @returns {HTMLDivElement}
     */
    private createNotificationContentContainer = (notification: HTMLDivElement): HTMLDivElement =>
    {
        const notificationContent = document.createElement('div');

        notificationContent.classList.add('pmd-notification__content');
        notification.appendChild(notificationContent);

        return notificationContent;
    };

    /**
     * @returns {HTMLDivElement}
     */
    private createNotificationHeaderContainer = (): HTMLDivElement =>
    {
        const notificationHeader = document.createElement('div');

        notificationHeader.classList.add('pmd-notification__header');

        return notificationHeader;
    };

    /**
     * @param {HTMLDivElement} notificationHeader
     *
     * @returns {HTMLDivElement}
     */
    private createNotificationStatusIconContainer = (notificationHeader: HTMLDivElement): HTMLDivElement | null =>
    {
        const { status } = this.props;

        if (status) {
            const notificationStatusIcon = document.createElement('div');

            notificationStatusIcon.id = 'pmd-notification__status-icon';
            notificationStatusIcon.setAttribute('data-testid', 'pmd-notification-status-icon');
            notificationHeader.appendChild(notificationStatusIcon);

            return notificationStatusIcon;
        }

        return null;
    };

    /**
     * @param {HTMLDivElement} notificationContent
     * @param {HTMLDivElement} notificationHeader
     *
     * @returns {HTMLDivElement}
     */
    private createNotificationTitleContainer =
        (notificationContent: HTMLDivElement, notificationHeader: HTMLDivElement): HTMLDivElement | undefined =>
        {
            const { message } = this.props;
            const notificationTitle = document.createElement('div');
            
            notificationTitle.classList.add('pmd-notification__message');
            notificationTitle.innerText = message;
            notificationHeader.appendChild(notificationTitle);
            notificationContent.appendChild(notificationHeader);

            return notificationTitle;
        };

    /**
     * @param {HTMLDivElement} notificationContent
     *
     * @returns {HTMLDivElement}
     */
    private createNotificationDescriptionContainer = (notificationContent: HTMLDivElement): HTMLDivElement =>
    {
        const notificationDescription = document.createElement('div');

        notificationDescription.classList.add('pmd-notification__description');
        notificationDescription.setAttribute('data-testid', 'pmd-notification-description');
        notificationContent.appendChild(notificationDescription);

        return notificationDescription;
    };

    /**
     * @param {HTMLDivElement} notificationContent
     *
     * @returns {HTMLDivElement}
     */
    private createNotificationCloseIconContainer = (notificationContent: HTMLDivElement): HTMLDivElement | null =>
    {
        const { closable } = this.props;

        if (closable) {
            const notificationCloseIcon = document.createElement('div');
            
            notificationCloseIcon.id = 'pmd-notification__close-icon';
            notificationCloseIcon.addEventListener('click', this.onClose);
            notificationCloseIcon.setAttribute('data-testid', 'pmd-notification-close-icon');
            notificationContent.appendChild(notificationCloseIcon);

            return notificationCloseIcon;
        }

        return null;
    };

    /**
     * Set timer to auto close notification after certain amount of time, if closable property is false.
     */
    private setTimer = (): void =>
    {
        const { timeout, closable } = this.props;

        if (!closable) {
            const delay = timeout ? timeout : defaultTimeout;

            delayTimeout = window.setTimeout(() => this.onClose(), delay);
        }
    };

    /**
     * Sets position of the root element.
     */
    private setPosition = () =>
    {
        const { position } = this.props;

        if (notificationRoot) {
            notificationRoot.removeAttribute('class');
            if (position === 'right') {
                notificationRoot.classList.add('pmd-notification-root--right');
            } else if (position === 'center') {
                notificationRoot.classList.add('pmd-notification-root--center');
            }
        }
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    private getStatusIcon = (): JSX.Element =>
    {
        const { status } = this.props;
        let icon = <></>;

        if (status) {
            switch (status) {
            case 'info':
                icon = <FontAwesomeIcon icon={faInfoCircle} data-testid="font-awesome-info" />;
                break;
            case 'success':
                icon = <FontAwesomeIcon icon={faCheckCircle} data-testid="font-awesome-check" />;
                break;
            case 'warning':
                icon = <FontAwesomeIcon icon={faExclamationCircle} data-testid="font-awesome-exclamation" />;
                break;
            case 'danger':
                return <FontAwesomeIcon icon={faTimesCircle} data-testid="font-awesome-times"/>;
            default:
                icon = <></>;
            }
        }

        return icon;
    };

    /**
     * @param {Object} props
     *
     * @returns {String}
     */
    private getClasses = ({ status, classes }: NotificationProps): string[] =>
    {
        let notificationClasses = ['pmd-notification'];

        if (status) {
            notificationClasses.push('pmd-notification--status');
            notificationClasses.push(`pmd-notification--${status}`);
        }

        if (classes) {
            notificationClasses = [...notificationClasses, ...classes];
        }

        return notificationClasses;
    };

    /**
     * Closes notification.
     */
    private onClose = () =>
    {
        if (notificationRoot) {
            notificationRoot.classList.add('pmd-notification-root--unmount');
            closeTimeout = window.setTimeout(() => this.props.onClose(), TIMEOUT);
        }
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        return createPortal(this.props.children, this.notificationDescription);
    }
}

export default Notification;