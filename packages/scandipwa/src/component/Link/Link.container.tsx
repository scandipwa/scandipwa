/* eslint-disable react/prop-types */

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

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import NoMatchDispatcher from 'Store/NoMatch/NoMatch.dispatcher';
import { ReactElement, Url } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { history } from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import Link from './Link.component';
import {
    LinkComponentProps,
    LinkContainerDispatchProps,
    LinkContainerFunctions,
    LinkContainerMapStateProps,
    LinkContainerProps,
    LinkContainerState,
    ProductGalleryComponentContainerPropKeys,
} from './Link.type';

/** @namespace Component/Link/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): LinkContainerMapStateProps => ({
    baseLinkUrl: state.ConfigReducer.base_link_url || '',
});

/** @namespace Component/Link/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): LinkContainerDispatchProps => ({
    updateNoMatch: (noMatch) => NoMatchDispatcher.updateNoMatch(dispatch, { noMatch }),
});

/** @namespace Component/Link/Container */
export class LinkContainer extends PureComponent<LinkContainerProps> {
    static defaultProps: Partial<LinkContainerProps> = {
        onClick: noopFn,
    };

    state: LinkContainerState = {
        isLoaderActive: false,
    };

    containerFunctions: LinkContainerFunctions = {
        onClick: this.onClick.bind(this),
        handleLinkClick: this.handleLinkClick.bind(this),
    };

    containerProps(): Pick<LinkComponentProps, ProductGalleryComponentContainerPropKeys> {
        const {
            block,
            elem,
            mods,
            mix,
            baseLinkUrl, // remove this prop
            dispatch, // remove this prop
            updateNoMatch,
            showLoader,
            ...restProps
        } = this.props;

        const {
            isLoaderActive,
        } = this.state;

        return {
            ...restProps,
            to: this.getTo(),
            bemProps: {
                block,
                elem,
                mods,
                mix,
            },
            showLoader,
            isLoaderActive,
        };
    }

    getTo(): Url | string {
        const { to: toProp } = this.props;
        // fix null, undefined and empty links
        const to = toProp || '/';

        if (typeof to === 'string') {
            // in case this URL is absolute, do not append store
            if (/^https?:\/\//.test(to)) {
                return to;
            }

            return appendWithStoreCode(to);
        }

        const pathname = to.pathname || '/';

        return {
            ...to,
            pathname: appendWithStoreCode(pathname),
        };
    }

    handleLinkClick(): void {
        const {
            to,
        } = this.props;

        this.setState({ isLoaderActive: true });

        setTimeout(() => {
            const link: any = to;
            history.push(link);
            this.setState({ isLoaderActive: false });
        }, 0);
    }

    // Resets no match state on redirect
    onClick(e: MouseEvent): void {
        const { updateNoMatch, onClick } = this.props;

        updateNoMatch(false);

        if (onClick) {
            onClick(e);
        }
    }

    render(): ReactElement {
        return (
            <Link
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
