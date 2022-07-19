/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { noopFn } from 'Util/Common';

import './ProductTab.style';

/** @namespace Component/ProductTab/Component */
export class ProductTab extends PureComponent {
    static propTypes = {
        tabName: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        isActive: PropTypes.bool
    };

    static defaultProps = {
        onClick: noopFn,
        isActive: false
    };

    onClick = this.onClick.bind(this);

    onClick() {
        const { onClick, tabName } = this.props;

        onClick(tabName);
    }

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
