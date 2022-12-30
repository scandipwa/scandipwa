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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import { ProductTabComponentProps } from './ProductTab.type';

import './ProductTab.style';

/** @namespace Component/ProductTab/Component */
export class ProductTabComponent extends PureComponent<ProductTabComponentProps> {
    __construct(props: ProductTabComponentProps) {
        super.__construct?.(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        const { onClick, tab: { id } } = this.props;

        onClick(id);
    }

    render(): ReactElement {
        const {
            tab: { name }, isActive,
        } = this.props;

        return (
            <li
              block="ProductTab"
              elem="Item"
              mods={ { isActive } }
            >
                <button
                  mix={ { block: 'ProductTab', elem: 'Button' } }
                  onClick={ this.onClickHandler }
                >
                    { name.toUpperCase() }
                </button>
            </li>
        );
    }
}

export default ProductTabComponent;
