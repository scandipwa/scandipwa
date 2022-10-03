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

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import ProductCompare from 'Component/ProductCompare';
import { ReactElement } from 'Type/Common.type';

import { ProductComparePageComponentProps } from './ProductComparePage.type';

import './ProductComparePage.style';

/** @namespace Route/ProductComparePage/Component */
export class ProductComparePageComponent extends PureComponent<ProductComparePageComponentProps> {
    render(): ReactElement {
        const { isLoading } = this.props;

        return (
            <main block="ProductComparePage">
                <Loader isLoading={ isLoading } />
                <ContentWrapper label={ __('Product Compare Page') }>
                    <ProductCompare />
                </ContentWrapper>
            </main>
        );
    }
}

export default ProductComparePageComponent;
