import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '../Typography';

import './style.scss';

/**
 * @type {String}
 */
type InputType = 'text' | 'email' | 'password' | 'file';

/**
 * @interface
 */
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

/**
 * @class ./themes/default/Input
 */
class Input extends Component<InputProps>
{
    static defaultProps = {
        type: 'text',
        fileText: 'Choose file ...',
        fileButtonText: 'Browse',
        disabled: false,
        withSearch: false,
        placeholder: '',
        label: ''
    };

    /**
     * @returns {String}
     */
    private getClasses = (): string =>
    {
        const { classes, disabled, withSearch, type } = this.props;
        let inputWrapperClasses = ['pmd-input-wrapper'];

        if (classes) {
            inputWrapperClasses = [...inputWrapperClasses, ...classes];
        }
        if (disabled) {
            inputWrapperClasses.push('pmd-input-wrapper--disabled');
        }
        if (withSearch && type !== 'file') {
            inputWrapperClasses.push('pmd-input-wrapper--search');
        }
        if (type === 'file') {
            inputWrapperClasses.push('pmd-input-wrapper--file');
        }

        return inputWrapperClasses.join(' ');
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    private renderFileTypeContent = (): JSX.Element =>
    {
        const { name, type, disabled, onChange, fileText, fileButtonText } = this.props;

        return (
            <label>
                <input name={name} type={type} id={name} className="pmd-input-file" disabled={disabled}
                    onChange={onChange} />
                <div className="pmd-input-file__custom">
                    <div className="pmd-input-file__custom-placeholder">{fileText}</div>
                    <div className="pmd-input-file__custom-button">{fileButtonText}</div>
                </div>
            </label>
        );
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    private renderContent = (): JSX.Element =>
    {
        const { name, type, value, placeholder, disabled, withSearch, onChange } = this.props;
        let content = (
            <React.Fragment>
                <input id={name} name={name} type={type} value={value} className="pmd-input" placeholder={placeholder}
                    disabled={disabled} onChange={onChange} />
                {
                    withSearch &&
                    <div className="pmd-input--search" data-testid="pmd-input-search">
                        <FontAwesomeIcon icon={faSearch} size="lg" color="#8E8E8C"/>
                    </div>
                }
            </React.Fragment>
        );

        if (type === 'file') {
            content = this.renderFileTypeContent();
        }

        return content;
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render():JSX.Element
    {
        const { name, label } = this.props;

        return (
            <div className={this.getClasses()} data-testid="pmd-input">
                {
                    label &&
                    <label className="pmd-input-label" htmlFor={name} data-testid="pmd-input-label">
                        <Typography variant="body-regular-18" noWrap truncate>
                            {label}
                        </Typography>
                    </label>
                }
                {this.renderContent()}
            </div>
        );
    }
}

export default Input;