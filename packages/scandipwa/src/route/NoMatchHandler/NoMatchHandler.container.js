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
import { withRouter } from 'react-router-dom';

import { updateMeta } from 'Store/Meta/Meta.action';
import { ChildrenType } from 'Type/Common.type';
import { LocationType } from 'Type/Router.type';

import NoMatchHandler from './NoMatchHandler.component';

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Route/NoMatchHandler/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    noMatch: state.NoMatchReducer.noMatch
});

/** @namespace Route/NoMatchHandler/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateNoMatch: (options) => {
        NoMatchDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateNoMatch(dispatch, options)
        );
    }
});

/** @namespace Route/NoMatchHandler/Container */
export class NoMatchHandlerContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        noMatch: PropTypes.bool,
        location: LocationType.isRequired,
        updateNoMatch: PropTypes.func.isRequired,
        children: ChildrenType.isRequired
    };

    static defaultProps = {
        noMatch: false
    };

    componentDidUpdate(prevProps) {
        const { noMatch, updateMeta } = this.props;
        const { noMatch: prevNoMatch } = prevProps;

        if (noMatch !== prevNoMatch) {
            updateMeta({ title: __('Page not found') });
        }
    }

    containerProps() {
        const {
            children,
            location,
            noMatch,
            updateMeta,
            updateNoMatch
        } = this.props;

        return {
            children,
            location,
            noMatch,
            updateMeta,
            updateNoMatch
        };
    }

    render() {
        return (
            <NoMatchHandler
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NoMatchHandlerContainer)
);
