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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';

import NoMatch from './NoMatch.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch));
    },
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export class NoMatchContainer extends PureComponent {
    render() {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { ({ cleanUpTransition }) => (
                    <NoMatch
                      { ...{ ...this.props, cleanUpTransition } }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(null, mapDispatchToProps)(NoMatchContainer);
