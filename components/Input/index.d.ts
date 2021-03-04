import * as React from 'react';

export function Input(props: InputProps): JSX.Element;

interface InputProps {
    name: string;
    type?: InputType;
    fileText?: string;
    fileButtonText?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    withSearch?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    classes?: string[];
}

type InputType = 'text' | 'email' | 'password' | 'file';
