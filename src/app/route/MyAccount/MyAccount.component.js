import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MyAccountDashboard from 'Component/MyAccountDashboard';
import MyAccountMyOrders from 'Component/MyAccountMyOrders';
import MyAccountMyWishlistContainer from 'Component/MyAccountMyWishlist';
import MyAccountAddressBook from 'Component/MyAccountAddressBook';
import MyAccountTabList from 'Component/MyAccountTabList';
import {
    activeTabType,
    tabMapType,
    DASHBOARD,
    MY_ORDERS,
    MY_WISHLIST,
    ADDRESS_BOOK
} from 'Type/Account';

import './MyAccount.style';
import ContentWrapper from 'Component/ContentWrapper';

class MyAccount extends PureComponent {
    static propTypes = {
        activeTab: activeTabType.isRequired,
        tabMap: tabMapType.isRequired,
        changeActiveTab: PropTypes.func.isRequired
    };

    renderMap = {
        [DASHBOARD]: MyAccountDashboard,
        [MY_ORDERS]: MyAccountMyOrders,
        [MY_WISHLIST]: MyAccountMyWishlistContainer,
        [ADDRESS_BOOK]: MyAccountAddressBook
    };

    render() {
        const { activeTab, tabMap, changeActiveTab } = this.props;
        const TabContent = this.renderMap[activeTab];
        const { name } = tabMap[activeTab];

        return (
            <main block="MyAccount">
                <ContentWrapper
                  label={ __('My Account page') }
                  wrapperMix={ { block: 'MyAccount', elem: 'Wrapper' } }
                >
                    <MyAccountTabList
                      tabMap={ tabMap }
                      activeTab={ activeTab }
                      changeActiveTab={ changeActiveTab }
                    />
                    <div block="MyAccount" elem="TabContent">
                        <h1 block="MyAccount" elem="Heading">{ name }</h1>
                        <TabContent />
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default MyAccount;
