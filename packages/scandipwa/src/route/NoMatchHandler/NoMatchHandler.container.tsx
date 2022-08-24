/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
<<<<<<< HEAD:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.tsx
 * @package scandipwa/scandipwa
=======
 * @package scandipwa/scandipwa
>>>>>>> scandipwa/master:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.js
 * @link https://github.com/scandipwa/scandipwa
 */

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.tsx
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { updateMeta } from 'Store/Meta/Meta.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';
=======

import { updateMeta } from 'Store/Meta/Meta.action';
import { ChildrenType } from 'Type/Common.type';
>>>>>>> scandipwa/master:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.js

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
<<<<<<< HEAD:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.tsx
export class NoMatchHandlerContainer extends PureComponent<NoMatchHandlerContainerProps> {
    static defaultProps: Partial<NoMatchHandlerContainerProps> = {
=======
export class NoMatchHandlerContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        noMatch: PropTypes.bool,
        updateNoMatch: PropTypes.func.isRequired,
        children: ChildrenType.isRequired
    };

    static defaultProps = {
>>>>>>> scandipwa/master:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.js
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

<<<<<<< HEAD:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.tsx
export default withRouter(
    connect(
        mapStateToProps, mapDispatchToProps
    )(
        NoMatchHandlerContainer as unknown as ComponentType<NoMatchHandlerContainerProps>
    )
);
=======
export default connect(mapStateToProps, mapDispatchToProps)(NoMatchHandlerContainer);
>>>>>>> scandipwa/master:packages/scandipwa/src/route/NoMatchHandler/NoMatchHandler.container.js
