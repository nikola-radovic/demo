import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '../Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

/**
 * @type {Object}
 */
type ItemType = {
    name: string;
    href?: string;
};

/**
 * @interface
 */
interface DropdownProps {
    title: string;
    items: ItemType[];
    onClick?: (name: string) => void;
    classes?: string[];
}

/**
 * @class ./themes/default/Dropdown
 */
class Dropdown extends Component<DropdownProps>
{
    /**
     * @returns {String}
     */
    private getClasses = (): string =>
    {
        const { classes } = this.props;
        let dropdownClasses = ['pmd-dropdown'];

        if (classes) {
            dropdownClasses = [...dropdownClasses, ...classes];
        }

        return dropdownClasses.join(' ');
    };

    /**
     * @param {Number} index
     * @param {Array} item
     * @param {Function} onClick
     */
    private getContentItem = (index: number, item: ItemType, onClick?: ((name: string) => void)): JSX.Element =>
    {
        let contentItem: JSX.Element | null = null;

        if (item.href) {
            contentItem = (
                <NavLink data-testid="pmd-dropdown__content-item" key={index} to={item.href} exact
                    className="pmd-dropdown__content-item" activeClassName="pmd-dropdown__content-item--active">
                    <Typography variant="body-regular-18" noWrap truncate title={item.name}>
                        {item.name}
                    </Typography>
                </NavLink>
            );
        } else {
            contentItem = (
                <div data-testid="pmd-dropdown__content-item" key={index} className="pmd-dropdown__content-item"
                    onClick={() => (onClick ? onClick(item.name) : null)}>
                    <Typography variant="body-regular-18" noWrap truncate title={item.name}>
                        {item.name}
                    </Typography>
                </div>
            );
        }

        return contentItem;
    };

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        const { title, items, onClick } = this.props;

        return (
            <div data-testid="pmd-dropdown" className={this.getClasses()}>
                <Typography variant="body-regular-18" noWrap truncate title={title}>
                    {title}
                </Typography>
                <FontAwesomeIcon icon={faAngleDown} />
                <div data-testid="pmd-dropdown__content" className="pmd-dropdown__content">
                    {
                        items.map((item, index) => (this.getContentItem(index, item, onClick)))
                    }
                </div>
            </div>
        );
    }
}

export default Dropdown;