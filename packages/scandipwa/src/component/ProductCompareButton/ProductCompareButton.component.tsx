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

import { PureComponent } from 'react';

import CompareIcon from 'Component/CompareIcon';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';

import { ProductCompareButtonComponentProps } from './ProductCompareButton.type';

import './ProductCompareButton.style';

/** @namespace Component/ProductCompareButton/Component */
export class ProductCompareButton extends PureComponent<ProductCompareButtonComponentProps> {
    static defaultProps = {
        isLoading: false,
        isActive: false
    };

    render(): ReactElement {
        const {
            handleClick,
            isLoading,
            isActive,
            mix
        } = this.props;

        return (
            <div
              block="ProductCompareButton"
              mods={ { isActive } }
              mix={ mix }
            >
                <button
                  block="ProductCompareButton"
                  elem="Button"
                  onClick={ handleClick }
                  mix={ { block: 'Button' } }
                  aria-label={ __('Compare') }
                >
                    <CompareIcon isActive={ isActive } />
                    <Loader isLoading={ isLoading } />
                </button>
            </div>
        );
    }
}

export default ProductCompareButton;
