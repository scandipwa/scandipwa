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
import { noopFn } from 'Util/Common';

import { ProductTabComponentProps } from './ProductTab.type';

import './ProductTab.style';

/** @namespace Component/ProductTab/Component */
export class ProductTabComponent<
P extends Readonly<ProductTabComponentProps> = Readonly<ProductTabComponentProps>,
S extends ProductTabComponentState = ProductTabComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductTabComponentProps> = {
        onClick: noopFn,
        isActive: false,
    };

    __construct(props: ProductTabComponentProps): void {
        super.__construct?.(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(): void {
        const { onClick, tabName } = this.props;

        onClick(tabName);
    }

    render(): ReactElement {
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

export default ProductTabComponent;
