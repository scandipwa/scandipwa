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
import { connect } from 'react-redux';

import { DownloadableSamplesType } from 'Type/ProductList.type';

import ProductDownloadableSamples from './ProductDownloadableSamples.component';

/** @namespace Component/ProductDownloadableSamples/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window
});

/** @namespace Component/ProductDownloadableSamples/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ProductDownloadableSamples/Container */
export class ProductDownloadableSamplesContainer extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        samples: DownloadableSamplesType.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired
    };

    containerProps() {
        const { title, samples, isOpenInNewTab } = this.props;

        return { title, samples, isOpenInNewTab };
    }

    render() {
        return (
            <ProductDownloadableSamples
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDownloadableSamplesContainer);
