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

import ProductDownloadableSamples from './ProductDownloadableSamples.component';
import {
    ProductDownloadableSamplesComponentProps,
    ProductDownloadableSamplesContainerMapDispatchProps,
    ProductDownloadableSamplesContainerMapStateProps,
    ProductDownloadableSamplesContainerProps,
} from './ProductDownloadableSamples.type';

/** @namespace Component/ProductDownloadableSamples/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductDownloadableSamplesContainerMapStateProps => ({
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window,
});

/** @namespace Component/ProductDownloadableSamples/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductDownloadableSamplesContainerMapDispatchProps => ({});

/** @namespace Component/ProductDownloadableSamples/Container */
export class ProductDownloadableSamplesContainer extends PureComponent<ProductDownloadableSamplesContainerProps> {
    containerProps(): ProductDownloadableSamplesComponentProps {
        const { title, samples, isOpenInNewTab } = this.props;

        return { title, samples, isOpenInNewTab };
    }

    render(): ReactElement {
        return (
            <ProductDownloadableSamples
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDownloadableSamplesContainer);
