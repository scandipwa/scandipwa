/* eslint-disable react/prop-types */

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

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ReactElement, Url } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import Link from './Link.component';
import {
    LinkComponentProps,
    LinkContainerDispatchProps,
    LinkContainerFunctions,
    LinkContainerMapStateProps,
    LinkContainerProps
} from './Link.type';

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Component/Link/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): LinkContainerMapStateProps => ({
    baseLinkUrl: state.ConfigReducer.base_link_url || ''
});

/** @namespace Component/Link/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): LinkContainerDispatchProps => ({
    updateNoMatch: (noMatch) => NoMatchDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateNoMatch(dispatch, { noMatch })
    )
});

/** @namespace Component/Link/Container */
export class LinkContainer extends PureComponent<LinkContainerProps> {
    static defaultProps: Partial<LinkContainerProps> = {
        onClick: noopFn
    };

    containerFunctions: LinkContainerFunctions = {
        onClick: this.onClick.bind(this)
    };

    containerProps(): LinkComponentProps {
        const {
            block,
            elem,
            mods,
            mix,
            baseLinkUrl, // remove this prop
            dispatch, // remove this prop
            updateNoMatch,
            ...restProps
        } = this.props;

        return {
            ...restProps,
            to: this.getTo(),
            bemProps: {
                block,
                elem,
                mods,
                mix
            }
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
            pathname: appendWithStoreCode(pathname)
        };
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
