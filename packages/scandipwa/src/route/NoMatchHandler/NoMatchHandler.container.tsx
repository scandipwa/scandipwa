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

import { updateMetaStore } from 'Store/Meta/Meta.action';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import NoMatchHandler from './NoMatchHandler.component';
import {
    NoMatchHandlerComponentProps,
    NoMatchHandlerContainerMapDispatchProps,
    NoMatchHandlerContainerMapStateProps,
    NoMatchHandlerContainerProps,
    NoMatchHandlerContainerPropsKeys,
} from './NoMatchHandler.type';

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Route/NoMatchHandler/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NoMatchHandlerContainerMapStateProps => ({
    noMatch: state.NoMatchReducer.noMatch,
});

/** @namespace Route/NoMatchHandler/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NoMatchHandlerContainerMapDispatchProps => ({
    updateMetaStore: (state) => dispatch(updateMetaStore(state)),
    updateNoMatch: (options) => {
        NoMatchDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateNoMatch(options),
        );
    },
});

/** @namespace Route/NoMatchHandler/Container */
export class NoMatchHandlerContainer extends PureComponent<NoMatchHandlerContainerProps> {
    static defaultProps: Partial<NoMatchHandlerContainerProps> = {
        noMatch: false,
    };

    componentDidUpdate(prevProps: NoMatchHandlerContainerProps): void {
        const { noMatch, updateMetaStore } = this.props;
        const { noMatch: prevNoMatch } = prevProps;

        if (noMatch !== prevNoMatch) {
            updateMetaStore({ title: __('Page not found') });
        }
    }

    containerProps(): Pick<NoMatchHandlerComponentProps, NoMatchHandlerContainerPropsKeys> {
        const {
            children,
            noMatch,
            updateNoMatch,
        } = this.props;
        const { location } = history;

        return {
            children,
            location,
            noMatch,
            updateNoMatch,
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

export default
connect(mapStateToProps, mapDispatchToProps)(
    NoMatchHandlerContainer,
);
