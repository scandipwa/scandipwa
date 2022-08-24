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

import Html from 'Component/Html';
import { ReactElement } from 'Type/Common.type';

import { ProductCompareAttributeRowComponentProps } from './ProductCompareAttributeRow.type';

import './ProductCompareAttributeRow.style';

/** @namespace Component/ProductCompareAttributeRow/Component */
export class ProductCompareAttributeRow extends PureComponent<ProductCompareAttributeRowComponentProps> {
    renderTitle(): ReactElement {
        const { title } = this.props;

        return (
            <div block="ProductCompareAttributeRow" elem="Title">
                { title }
            </div>
        );
    }

    renderValue(value: string | null, i: number): ReactElement {
        if (value === null) {
            return <div block="ProductCompareAttributeRow" elem="Value" key={ i }>&mdash;</div>;
        }

        return (
            <div block="ProductCompareAttributeRow" elem="Value" key={ i }>
                <Html content={ value } />
            </div>
        );
    }

    renderValues(): ReactElement {
        const {
            device: { isMobile },
            values = []
        } = this.props;
        const renderableValues = values.map(this.renderValue);

        if (!isMobile) {
            return renderableValues;
        }

        return (
            <div block="ProductCompareAttributeRow" elem="Values">
                { renderableValues }
            </div>
        );
    }

    render(): ReactElement {
        return (
            <div block="ProductCompareAttributeRow">
                { this.renderTitle() }
                { this.renderValues() }
            </div>
        );
    }
}

export default ProductCompareAttributeRow;
