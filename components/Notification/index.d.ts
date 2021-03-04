import * as React from 'react';

export function Notification(props: NotificationProps): JSX.Element;

interface NotificationProps {
    children?: React.ReactNode;
    message: string;
    status?: 'info' | 'success' | 'danger' | 'warning';
    position?: 'right' | 'center';
    timeout?: number;
    closable?: boolean;
    onClose: () => void;
    classes?: string[];
}