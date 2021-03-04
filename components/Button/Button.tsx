import React, { Component, MouseEvent } from 'react';
import { Typography } from '../Typography';

import './style.scss';

/**
 * @interface
 */
interface ButtonProps {
    classes?: string[];
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    autoWidth?: boolean;
    plainText?: boolean;
}

/**
 * @class ./themes/default/Button
 */
class Button extends Component<ButtonProps>
{
    static defaultProps = {
        disabled: false,
        autoWidth: false,
        plainText: false
    };

    /**
     * @returns {String}
     */
    private getClasses = (): string =>
    {
        const { classes, autoWidth, plainText } = this.props;
        let buttonClasses = ['pmd-btn'];

        if (autoWidth) {
            buttonClasses.push('pmd-btn--auto-width');
        }
        if (plainText) {
            buttonClasses.push('pmd-btn--plain-text');
        }
        if (classes) {
            buttonClasses = [...buttonClasses, ...classes];
        }

        return buttonClasses.join(' ');
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        const { disabled, children, onClick } = this.props;

        return (
            <button type="button" className={this.getClasses()} disabled={disabled} onClick={onClick}>
                <Typography variant="body-bold-18" align="center" noWrap truncate>
                    {children}
                </Typography>
            </button>
        );
    }
}

export default Button;