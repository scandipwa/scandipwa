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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { LinkType } from 'Type/Router.type';
import { noopFn } from 'Util/Common';
import { appendWithStoreCode } from 'Util/Url';

import Link from './Link.component';

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Component/Link/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    baseLinkUrl: state.ConfigReducer.base_link_url || ''
});

/** @namespace Component/Link/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateNoMatch: (options) => NoMatchDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateNoMatch(dispatch, options)
    )
});

/** @namespace Component/Link/Container */
export class LinkContainer extends PureComponent {
    static propTypes = {
        baseLinkUrl: PropTypes.string.isRequired,
        updateNoMatch: PropTypes.func.isRequired,
        onClick: PropTypes.func,
        to: LinkType.isRequired
    };

    static defaultProps = {
        onClick: noopFn
    };

    containerFunctions = {
        onClick: this.onClick.bind(this)
    };

    containerProps() {
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

    getTo() {
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
    onClick(e) {
        const { updateNoMatch, onClick } = this.props;
        updateNoMatch(false);

        if (onClick) {
            onClick(e);
        }
    }

    render() {
        return (
            <Link
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
