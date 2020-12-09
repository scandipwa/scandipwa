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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './ProductTab.style';

/** @namespace Component/ProductTab/Component */
export class ProductTab extends PureComponent {
    static propTypes = {
        tabName: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        isActive: PropTypes.bool
    };

    static defaultProps = {
        onClick: () => {},
        isActive: false
    };

    onClick = () => {
        const { onClick, tabName } = this.props;
        onClick(tabName);
    };

    render() {
        const { tabName, isActive } = this.props;

        return (
            <li
              block="ProductTab"
              elem="Item"
              mods={ { isActive } }
            >
                <button
                  mix={ { block: 'ProductTab', elem: 'Button' } }
                  onClick={ this.onClick }
                >
                    { tabName.toUpperCase() }
                </button>
            </li>
        );
    }
}

export default ProductTab;
