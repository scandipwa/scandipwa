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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Subscribe } from 'unstated';

import { Page } from 'Component/Header/Header.config';
import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import NoMatch from './NoMatch.component';
import {
    NoMatchComponentProps,
    NoMatchContainerMapDispatchProps,
    NoMatchContainerMapStateProps,
    NoMatchContainerProps,
    NoMatchContainerPropsKeys
} from './NoMatch.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/NoMatch/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NoMatchContainerMapDispatchProps => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
    updateNoMatch: (options) => dispatch(updateNoMatch(options))
});

/** @namespace Route/NoMatch/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NoMatchContainerMapStateProps => ({
    urlRewrite: state.UrlRewritesReducer.urlRewrite
});

/** @namespace Route/NoMatch/Container */
export class NoMatchContainer extends PureComponent<NoMatchContainerProps> {
    componentDidMount(): void {
        this.updateHeaderState();
        this.updateMeta();
        this.updateNoMatch();
    }

    componentWillUnmount(): void {
        const { updateNoMatch } = this.props;

        updateNoMatch(false);
    }

    containerProps(): Pick<NoMatchComponentProps, NoMatchContainerPropsKeys> {
        const { updateBreadcrumbs } = this.props;

        return { updateBreadcrumbs };
    }

    updateHeaderState(): void {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: Page.NO_MATCH,
            title: __('Page not found'),
            isHiddenOnMobile: true
        });
    }

    updateMeta(): void {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Page not found'), status_code: '404' });
    }

    updateNoMatch(): void {
        const { updateNoMatch } = this.props;

        updateNoMatch(true);
    }

    render(): ReactElement {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ }
                { ({ cleanUpTransition }: any) => (
                    <NoMatch
                      { ...this.containerProps() }
                      cleanUpTransition={ cleanUpTransition }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoMatchContainer);
