import * as React from 'react';

export function Tabs(props: TabsProps): JSX.Element;
export function TabItem(props: TabItemProps): JSX.Element;

interface TabsProps {
    children?: React.ReactNode;
    classes?: string[];
    activeKey: string;
    variant?: VariantType;
    onSelect: (value: string) => void;
}

interface TabItemProps {
    children?: React.ReactNode;
    classes?: string[];
    tabKey: string;
    title: string;
    divider?: boolean;
    disabled?: boolean;
}

type VariantType = 'h1' | 'body-regular-12' | 'body-regular-14' | 'body-regular-16' | 'body-regular-18' |
    'body-medium-16' | 'body-medium-18' | 'body-medium-24' | 'body-bold-18';