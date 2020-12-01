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

import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { ProductType } from 'Type/ProductList';

import SearchItem from './SearchItem.component';

export const SearchBarDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/SearchBar/SearchBar.dispatcher'
);

/** @namespace Component/SearchItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/SearchItem/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

/** @namespace Component/SearchItem/Container */
export class SearchItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired
    };

    containerFunctions = {
        onClick: this.handleItemClick.bind(this)
    };

    containerProps = () => ({
        linkTo: this.getLinkTo(),
        imgSrc: this.getImgSrc(),
        customAttribute: this.getCustomAttribute()
    });

    handleItemClick() {
        const { hideActiveOverlay } = this.props;

        hideActiveOverlay();
    }

    getLinkTo() {
        const {
            product,
            product: { url }
        } = this.props;

        if (!url) {
            return {};
        }

        return {
            pathname: url,
            state: { product }
        };
    }

    getImgSrc() {
        const {
            product: {
                thumbnail: { url } = {}
            }
        } = this.props;

        return url;
    }

    getCustomAttribute() {
        const { product: { sku } } = this.props;
        const { product_list_content: { attribute_to_display } = {} } = window.contentConfiguration;
        const { product: { attributes = {} } } = this.props;
        const attribute = attributes[attribute_to_display || 'brand'];

        if (sku && !attribute) {
            return null;
        }

        return attribute;
    }

    render() {
        return (
            <SearchItem
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItemContainer);
