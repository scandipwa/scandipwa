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
import { connect } from 'react-redux';

import ProductCompareAttributeRow from './ProductCompareAttributeRow.component';

/** @namespace Component/ProductCompareAttributeRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompareAttributeRow/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ProductCompareAttributeRow/Container */
export class ProductCompareAttributeRowContainer extends PureComponent {
    render() {
        return (
            <ProductCompareAttributeRow
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareAttributeRowContainer);
