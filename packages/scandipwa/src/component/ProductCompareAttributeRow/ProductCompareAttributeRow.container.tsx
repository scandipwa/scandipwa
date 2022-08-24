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
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import ProductCompareAttributeRow from './ProductCompareAttributeRow.component';
import {
    ProductCompareAttributeRowComponentProps,
    ProductCompareAttributeRowContainerMapDispatchProps,
    ProductCompareAttributeRowContainerMapStateProps,
    ProductCompareAttributeRowContainerProps
} from './ProductCompareAttributeRow.type';

/** @namespace Component/ProductCompareAttributeRow/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductCompareAttributeRowContainerMapStateProps => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompareAttributeRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductCompareAttributeRowContainerMapDispatchProps => ({});

/** @namespace Component/ProductCompareAttributeRow/Container */
export class ProductCompareAttributeRowContainer extends PureComponent<ProductCompareAttributeRowContainerProps> {
    containerProps(): ProductCompareAttributeRowComponentProps {
        const { title, values, device } = this.props;

        return { title, values, device };
    }

    render(): ReactElement {
        return (
            <ProductCompareAttributeRow
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareAttributeRowContainer);
