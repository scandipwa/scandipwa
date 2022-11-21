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

import {
    Component, ElementType, lazy, Suspense,
} from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader/Loader.component';
import MyAccountInformation from 'Component/MyAccountInformation';
import MyAccountOrder from 'Component/MyAccountOrder';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import MyAccountTabList from 'Component/MyAccountTabList';
import NoMatch from 'Route/NoMatch';
import { MyAccountTabs } from 'Type/Account.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';

import { AccountPageUrl } from './MyAccount.config';
import { MyAccountComponentProps } from './MyAccount.type';

import './MyAccount.style';

export const MyAccountAddressBook = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-address" */
    'Component/MyAccountAddressBook'
));
export const MyAccountDashboard = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-dashboard" */
    'Component/MyAccountDashboard'
));
export const MyAccountDownloadable = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-downloadable" */
    'Component/MyAccountDownloadable'
));
export const MyAccountMyOrders = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-orders" */
    'Component/MyAccountMyOrders'
));
export const MyAccountMyWishlist = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-wishlist" */
    'Component/MyAccountMyWishlist'
));
export const MyAccountNewsletterSubscription = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-newsletter" */
    'Component/MyAccountNewsletterSubscription'
));

/** @namespace Route/MyAccount/Component */
export class MyAccountComponent extends Component<MyAccountComponentProps> {
    static defaultProps: Partial<MyAccountComponentProps> = {
        subHeading: '',
        tabName: '',
    };

    renderMap = {
        [ MyAccountTabs.MY_ACCOUNT ]: MyAccountDashboard,
        [ MyAccountTabs.MY_ORDER ]: MyAccountOrder,
        [ MyAccountTabs.MY_ORDERS ]: MyAccountMyOrders,
        [ MyAccountTabs.MY_WISHLIST ]: MyAccountMyWishlist,
        [ MyAccountTabs.ADDRESS_BOOK ]: MyAccountAddressBook,
        [ MyAccountTabs.NEWSLETTER_SUBSCRIPTION ]: MyAccountNewsletterSubscription,
        [ MyAccountTabs.MY_DOWNLOADABLE ]: MyAccountDownloadable,
        [ MyAccountTabs.ACCOUNT_INFORMATION ]: MyAccountInformation,
    } as unknown as Record<string, ElementType>;

    shouldComponentUpdate(nextProps: MyAccountComponentProps): boolean {
        const {
            activeTab,
            location: { pathname },
            tabName,
            subHeading,
        } = this.props;
        const {
            activeTab: nextActiveTab,
            location: {
                pathname: nextPathname,
            },
            tabName: nextTabName,
            subHeading: nextSubHeading,
        } = nextProps;

        return (
            activeTab !== nextActiveTab
            || pathname !== nextPathname
            || tabName !== nextTabName
            || subHeading !== nextSubHeading
        );
    }

    getTabContent(): ElementType {
        const { activeTab, location: { pathname } } = this.props;

        if (activeTab === MyAccountTabs.MY_ORDERS && pathname.includes(AccountPageUrl.ORDER_URL)) {
            return this.renderMap[ MyAccountTabs.MY_ORDER ];
        }

        return this.renderMap[ activeTab ];
    }

    renderLoginOverlay(): ReactElement {
        const { onSignIn } = this.props;

        return (
            <MyAccountOverlay
              onSignIn={ onSignIn }
            />
        );
    }

    renderSubHeading(): null | ReactElement {
        const { subHeading } = this.props;

        if (!subHeading) {
            return null;
        }

        return <span block="MyAccount" elem="SubHeading">{ subHeading }</span>;
    }

    renderContent(): ReactElement {
        const {
            activeTab,
            tabMap,
            changeActiveTab,
            onSignOut,
            isEditingActive,
            match,
            changeTabName,
            tabName,
            setTabSubheading,
            isTabEnabled,
        } = this.props;

        if (!isSignedIn()) {
            return this.renderLoginOverlay();
        }

        if (!isTabEnabled(activeTab)) {
            return <NoMatch />;
        }

        const TabContent = this.getTabContent();
        const { title } = tabMap[ activeTab ];

        return (
            <ContentWrapper
              label={ __('My Account page') }
              wrapperMix={ { block: 'MyAccount', elem: 'Wrapper' } }
            >
                <MyAccountTabList
                  tabMap={ tabMap }
                  activeTab={ activeTab }
                  changeActiveTab={ changeActiveTab }
                  onSignOut={ onSignOut }
                />
                <div
                  block="MyAccount"
                  elem="TabContent"
                  mods={ { activeTab } }
                >
                    <h2 block="MyAccount" elem="Heading">
                        { title || tabName }
                        { this.renderSubHeading() }
                    </h2>
                    <Suspense fallback={ <Loader /> }>
                        <TabContent
                          isEditingActive={ isEditingActive }
                          match={ match }
                          changeTabName={ changeTabName }
                          tabMap={ tabMap }
                          setTabSubheading={ setTabSubheading }
                        />
                    </Suspense>
                </div>
            </ContentWrapper>
        );
    }

    render(): ReactElement {
        return (
            <main block="MyAccount">
                { this.renderContent() }
            </main>
        );
    }
}

export default MyAccountComponent;
