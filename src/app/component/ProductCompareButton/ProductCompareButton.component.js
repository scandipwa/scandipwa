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

import './ProductCompareButton.style';

/** @namespace Component/ProductCompareButton/Component */
export class ProductCompareButton extends PureComponent {
    static propTypes = {
        handleClick: PropTypes.func.isRequired
    };

    render() {
        const { handleClick } = this.props;

        return (
            <div block="ProductCompareButton">
                <button
                  block="ProductCompareButton"
                  elem="Button"
                  onClick={ handleClick }
                  mix={ {
                      block: 'Button',
                      mods: { isHollow: true }
                  } }
                >
                    <div block="ProductCompareButton" elem="Icon" />
                </button>
            </div>
        );
    }
}

export default ProductCompareButton;
