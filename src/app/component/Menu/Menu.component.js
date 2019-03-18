/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuType } from 'Type/Menu';
import TextPlaceholder from 'Component/TextPlaceholder';
import './Menu.style';

/**
 * Menu component
 * @class Menu
 */
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            canGoBack: false
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleItemFocus = this.handleItemFocus.bind(this);
    }

    handleItemClick() {
        this.setState({ isActive: false, canGoBack: false });
        document.activeElement.blur();
    }

    handleItemFocus() {
        const { isActive } = this.state;
        if (!isActive) this.setState({ isActive: true });
    }

    /**
     * Change menu icon on mobile depending on depth
     * @param {Number} d depth
     * @return {void}
     */
    handleMenuChange(d) {
        const { canGoBack, isActive } = this.state;

        switch (d) {
        case 1:
            this.setState({ canGoBack: true });
            break;

        case 0:
            if (canGoBack) {
                this.setState({ canGoBack: false });
                break;
            } else if (isActive) {
                this.setState({ isActive: false });
                break;
            } else {
                this.setState({ isActive: true });
                break;
            }

        default:
            break;
        }
    }

    renderChildren(children, d) {
        return (
            <ul block="Menu" elem="Wrapper" mods={ { d } }>
                { children
                    .sort((a, b) => a.position - b.position)
                    .map(child => this.renderItem(child, d))
                }
            </ul>
        );
    }

    renderItem(item, d = 0) {
        const {
            item_id, title, children, url, category_id
        } = item;

        const childrenArray = Object.values(children || {});
        const hasChildren = !!childrenArray.length;
        const link = `${ category_id ? '/category' : '' }${url}`; // TODO: replace with config

        return (
            <li
              key={ item_id }
              block="Menu"
              elem="Item"
              mods={ { d, hasChildren } }
            >
                { !hasChildren && title && link
                    ? (
                        <Link
                          to={ link }
                          onClick={ this.handleItemClick }
                          onFocus={ this.handleItemFocus }
                        >
                            { title }
                        </Link>
                    )
                    : (
                        <p onTouchEnd={ () => this.handleMenuChange(d) }>
                            <TextPlaceholder content={ title } />
                        </p>
                    )
                }
                { hasChildren && this.renderChildren(childrenArray, d + 1) }
            </li>
        );
    }

    render() {
        const { menu } = this.props;
        const { isActive, canGoBack } = this.state;

        const isLoaded = !!Object.keys(menu).length;
        const placeholderMenu = {
            1: { item_id: '1' },
            5: { item_id: '5' },
            96: { item_id: '96' },
            97: { item_id: '97' }
        };

        return (
            <>
                <nav>
                    <ul
                      block="Menu"
                      mods={ { isLoaded, isActive, canGoBack } }
                      onMouseEnter={ () => this.setState({ isActive: true }) }
                    >
                        { Object.values(isLoaded ? menu : placeholderMenu).map(item => this.renderItem(item)) }
                    </ul>
                </nav>
            </>
        );
    }
}

Menu.propTypes = {
    menu: MenuType.isRequired
};


export default Menu;
