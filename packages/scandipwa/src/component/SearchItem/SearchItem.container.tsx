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
import { Dispatch } from 'redux';

import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { ReactElement, Url } from 'Type/Common.type';
import { IndexedAttributeWithValue } from 'Util/Product/Product.type';

import SearchItem from './SearchItem.component';
import {
    SearchItemComponentContainerPropKeys,
    SearchItemComponentProps,
    SearchItemContainerFunctions,
    SearchItemContainerMapDispatchProps,
    SearchItemContainerMapStateProps,
    SearchItemContainerProps,
} from './SearchItem.type';

/** @namespace Component/SearchItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SearchItemContainerMapDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
});

/** @namespace Component/SearchItem/Container/mapStateToProps */
export const mapStateToProps = (): SearchItemContainerMapStateProps => ({});

/** @namespace Component/SearchItem/Container */
export class SearchItemContainer extends PureComponent<SearchItemContainerProps> {
    containerFunctions: SearchItemContainerFunctions = {
        onClick: this.handleItemClick.bind(this),
    };

    containerProps(): Pick<SearchItemComponentProps, SearchItemComponentContainerPropKeys> {
        const { product } = this.props;

        return {
            product,
            linkTo: this.getLinkTo(),
            imgSrc: this.getImgSrc(),
            customAttribute: this.getCustomAttribute(),
        };
    }

    handleItemClick(): void {
        const { hideActiveOverlay } = this.props;

        hideActiveOverlay();
    }

    getLinkTo(): Url {
        const {
            product,
            product: { url },
        } = this.props;

        if (!url) {
            return { pathname: '' };
        }

        return {
            pathname: url,
            state: { product },
        };
    }

    getImgSrc(): string {
        const {
            product: {
                thumbnail: { url = '' } = {},
            },
        } = this.props;

        return url;
    }

    getCustomAttribute(): IndexedAttributeWithValue | null {
        const { product: { sku } } = this.props;
        const { product_list_content: { attribute_to_display = null } = {} } = window.contentConfiguration || {};
        const { product: { attributes = {} } } = this.props;
        const attribute = attributes[ attribute_to_display || 'brand' ];

        if (sku && !attribute) {
            return null;
        }

        return attribute;
    }

    render(): ReactElement {
        return (
            <SearchItem
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItemContainer);
