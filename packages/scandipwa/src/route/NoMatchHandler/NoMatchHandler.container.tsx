/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { updateMeta } from 'Store/Meta/Meta.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import NoMatchHandler from './NoMatchHandler.component';
import {
    NoMatchHandlerComponentProps,
    NoMatchHandlerContainerMapDispatchProps,
    NoMatchHandlerContainerMapStateProps,
    NoMatchHandlerContainerProps,
    NoMatchHandlerContainerPropsKeys
} from './NoMatchHandler.type';

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Route/NoMatchHandler/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NoMatchHandlerContainerMapStateProps => ({
    noMatch: state.NoMatchReducer.noMatch
});

/** @namespace Route/NoMatchHandler/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NoMatchHandlerContainerMapDispatchProps => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateNoMatch: (options) => {
        NoMatchDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateNoMatch(dispatch, options)
        );
    }
});

/** @namespace Route/NoMatchHandler/Container */
export class NoMatchHandlerContainer extends PureComponent<NoMatchHandlerContainerProps> {
    static defaultProps = {
        noMatch: false
    };

    componentDidUpdate(prevProps: NoMatchHandlerContainerProps): void {
        const { noMatch, updateMeta } = this.props;
        const { noMatch: prevNoMatch } = prevProps;

        if (noMatch !== prevNoMatch) {
            updateMeta({ title: __('Page not found') });
        }
    }

    containerProps(): Pick<NoMatchHandlerComponentProps, NoMatchHandlerContainerPropsKeys> {
        const {
            children,
            location,
            noMatch,
            updateNoMatch
        } = this.props;

        return {
            children,
            location,
            noMatch,
            updateNoMatch
        };
    }

    render(): ReactElement {
        return (
            <NoMatchHandler
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps, mapDispatchToProps
    )(
        NoMatchHandlerContainer as unknown as ComponentType<NoMatchHandlerContainerProps>
    )
);
