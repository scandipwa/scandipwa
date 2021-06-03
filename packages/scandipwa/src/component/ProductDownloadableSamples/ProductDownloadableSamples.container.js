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

import ProductDownloadableSamples from './ProductDownloadableSamples.component';

/** @namespace Component/ProductDownloadableSamples/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window
});

/** @namespace Component/ProductDownloadableSamples/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace Component/ProductDownloadableSamples/Container */
export class ProductDownloadableSamplesContainer extends PureComponent {
    render() {
        return (
            <ProductDownloadableSamples
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDownloadableSamplesContainer);
