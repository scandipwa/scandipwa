import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MyAccountDispatcher } from 'Store/MyAccount';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { CUSTOMER_ACCOUNT, HOME_PAGE } from 'Component/Header';
import { changeHeaderState } from 'Store/Header';
import { MatchType, HistoryType } from 'Type/Common';
import {
    DASHBOARD,
    MY_ORDERS,
    MY_WISHLIST,
    ADDRESS_BOOK
} from 'Type/Account';

import MyAccount from './MyAccount.component';

export const MY_ACCOUNT_URL = '/my-account';

export const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    requestCustomerData: () => MyAccountDispatcher.requestCustomerData(dispatch)
});

export class MyAccountContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    containerFunctions = {
        changeActiveTab: this.changeActiveTab.bind(this)
    };

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
        }
    };

    constructor(props) {
        super(props);

        const {
            match: {
                params: {
                    tab: activeTab = DASHBOARD
                } = {}
            } = {},
            changeHeaderState,
            requestCustomerData,
            history
        } = props;

        this.state = { activeTab };

        changeHeaderState({
            title: 'My account',
            name: CUSTOMER_ACCOUNT,
            onBackClick: () => history.push('/')
        });

        requestCustomerData();

        this.updateBreadcrumbs();
        this.redirectIfNotSignedIn();
    }

    componentDidUpdate() {
        this.redirectIfNotSignedIn();
    }

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    changeActiveTab(activeTab) {
        const { history } = this.props;
        const { [activeTab]: { url } } = this.tabMap;

        this.setState({ activeTab }, () => this.updateBreadcrumbs());
        history.push(`${ MY_ACCOUNT_URL }${ url }`);
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const { activeTab } = this.state;
        const { url, name } = this.tabMap[activeTab];

        updateBreadcrumbs([
            { url: `${ MY_ACCOUNT_URL }${ url }`, name },
            { name: __('My Account'), url: `${ MY_ACCOUNT_URL }${ DASHBOARD }` }
        ]);
    }

    redirectIfNotSignedIn() {
        const { isSignedIn, history } = this.props;
        if (!isSignedIn) history.push('/');
    }

    render() {
        return (
            <MyAccount
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
              tabMap={ this.tabMap }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer);
