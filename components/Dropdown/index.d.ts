export function Dropdown(props: DropdownProps): JSX.Element;

interface DropdownProps {
    title: string;
    items: ItemType[];
    onClick?: (name: string) => void;
    classes?: string[];
}

type ItemType = {
    name: string;
    href?: string;
}