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

import { MouseEvent, PureComponent } from 'react';

import CompareIcon from 'Component/CompareIcon';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { ProductCompareButtonComponentProps } from './ProductCompareButton.type';

import './ProductCompareButton.style';

/** @namespace Component/ProductCompareButton/Component */
export class ProductCompareButton extends PureComponent<ProductCompareButtonComponentProps> {
    static defaultProps: Partial<ProductCompareButtonComponentProps> = {
        isLoading: false,
        isActive: false
    };

    handleClick: ((e: MouseEvent) => void) | (() => void) = noopFn;

    __construct(props: ProductCompareButtonComponentProps): void {
        super.__construct?.(props);
        this.handleClick = this._handleClick.bind(this);
    }

    _handleClick(e: MouseEvent): void {
        const { handleClick } = this.props;

        e.stopPropagation();
        handleClick(e);
    }

    render(): ReactElement {
        const {
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
                  onClick={ this.handleClick }
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
