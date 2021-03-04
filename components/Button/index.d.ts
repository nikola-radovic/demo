import * as React from 'react';

export function Button(props: ButtonProps): JSX.Element;

interface ButtonProps {
    children?: React.ReactNode;
    classes?: string[];
    onClick?: () => void;
    disabled?: boolean;
    autoWidth?: boolean;
    plainText?: boolean;
}
