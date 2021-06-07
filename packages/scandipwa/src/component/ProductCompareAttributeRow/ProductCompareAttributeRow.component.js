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

import Html from 'Component/Html';
import { DeviceType } from 'Type/Device';

import './ProductCompareAttributeRow.style';

/** @namespace Component/ProductCompareAttributeRow/Component */
export class ProductCompareAttributeRow extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        values: PropTypes.array.isRequired,
        device: DeviceType.isRequired
    };

    renderTitle() {
        const { title } = this.props;

        return (
            <div block="ProductCompareAttributeRow" elem="Title">
                { title }
            </div>
        );
    }

    renderValue(value, i) {
        if (value === null) {
            return <div block="ProductCompareAttributeRow" elem="Value" key={ i }>&mdash;</div>;
        }

        return (
            <div block="ProductCompareAttributeRow" elem="Value" key={ i }>
                <Html content={ value } />
            </div>
        );
    }

    renderValues() {
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

    render() {
        return (
            <div block="ProductCompareAttributeRow">
                { this.renderTitle() }
                { this.renderValues() }
            </div>
        );
    }
}

export default ProductCompareAttributeRow;
