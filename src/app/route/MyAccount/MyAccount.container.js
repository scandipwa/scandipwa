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

import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { CUSTOMER_ACCOUNT_PAGE, CUSTOMER_ACCOUNT } from 'Component/Header';
import { changeNavigationState } from 'Store/Navigation';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { HistoryType, MatchType } from 'Type/Common';
import { toggleOverlayByKey } from 'Store/Overlay';
import isMobile from 'Util/Mobile';

import {
    ADDRESS_BOOK,
    DASHBOARD,
    MY_ORDERS,
    MY_WISHLIST,
    NEWSLETTER_SUBSCRIPTION
} from 'Type/Account';

import MyAccount from './MyAccount.component';

export const MY_ACCOUNT_URL = '/my-account';

export const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
    changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    requestCustomerData: () => MyAccountDispatcher.requestCustomerData(dispatch),
    toggleOverlayByKey: key => dispatch(toggleOverlayByKey(key))
});

export class MyAccountContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    static navigateToSelectedTab(props, state = {}) {
        const {
            match: {
                params: {
                    tab: historyActiveTab = DASHBOARD
                } = {}
            } = {}
        } = props;

        const { activeTab } = state;

        if (activeTab !== historyActiveTab) {
            return { activeTab: historyActiveTab };
        }

        return null;
    }

    tabMap = {
        [DASHBOARD]: {
            url: '/dashboard',
            name: __('Dashboard')
        },
        [ADDRESS_BOOK]: {
            url: '/address-book',
            name: __('Address book')
        },
        [MY_ORDERS]: {
            url: '/my-orders',
            name: __('My orders')
        },
        [MY_WISHLIST]: {
            url: '/my-wishlist',
            name: __('My wishlist')
        },
        [NEWSLETTER_SUBSCRIPTION]: {
            url: '/newsletter-subscription',
            name: __('Newsletter Subscription')
        }
    };

    containerFunctions = {
        changeActiveTab: this.changeActiveTab.bind(this),
        onSignIn: this.onSignIn.bind(this),
        onSignOut: this.onSignOut.bind(this)
    };

    constructor(props) {
        super(props);

        this.state = MyAccountContainer.navigateToSelectedTab(this.props) || {};
    }

    componentDidMount() {
        const {
            isSignedIn,
            toggleOverlayByKey
        } = this.props;

        if (!isSignedIn) {
            toggleOverlayByKey(CUSTOMER_ACCOUNT);
        }

        this.redirectIfNotSignedIn();
        this.onSignIn();
        this.updateBreadcrumbs();
    }

    static getDerivedStateFromProps(props, state) {
        return MyAccountContainer.navigateToSelectedTab(props, state);
    }

    componentDidUpdate(_, prevState) {
        const { prevActiveTab } = prevState;
        const { activeTab } = this.state;

        this.redirectIfNotSignedIn();
        if (prevActiveTab !== activeTab) this.updateBreadcrumbs();
    }

    onSignOut() {
        const { toggleOverlayByKey } = this.props;
        this.setState({ activeTab: DASHBOARD });
        toggleOverlayByKey(CUSTOMER_ACCOUNT);
    }

    onSignIn() {
        const {
            requestCustomerData,
            changeHeaderState,
            isSignedIn,
            history
        } = this.props;

        if (isSignedIn) {
            requestCustomerData();
        }

        changeHeaderState({
            title: 'My account',
            name: CUSTOMER_ACCOUNT_PAGE,
            onBackClick: () => history.push('/')
        });
    }

    changeActiveTab(activeTab) {
        const { history } = this.props;
        const { [activeTab]: { url } } = this.tabMap;
        history.push(`${ MY_ACCOUNT_URL }${ url }`);
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const { activeTab } = this.state;
        const { url, name } = this.tabMap[activeTab];

        updateBreadcrumbs([
            { url: `${ MY_ACCOUNT_URL }${ url }`, name },
            { name: __('My Account'), url: `${ MY_ACCOUNT_URL }/${ DASHBOARD }` }
        ]);
    }

    redirectIfNotSignedIn() {
        const {
            isSignedIn,
            history
        } = this.props;

        if (isSignedIn) return;

        if (!isMobile.any()) {
            history.push('/');
        }
    }

    render() {
        return (
            <MyAccount
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              tabMap={ this.tabMap }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer);
