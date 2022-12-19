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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import ContactFormQuery from 'Query/ContactForm.query';
import { updateMetaStore } from 'Store/Meta/Meta.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { getErrorMessage } from 'Util/Request';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import ContactPage from './ContactPage.component';
import {
    ContactPageComponentProps,
    ContactPageContainerProps,
    ContactPageContainerState,
    ContactPageMapDispatchProps,
    ContactPageMapStateProps,
} from './ContactPage.type';

export const NavigationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Navigation/Navigation.dispatcher'
);

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/ContactPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ContactPageMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Route/ContactPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ContactPageMapDispatchProps => ({
    showNotification: (type, message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(type, message),
    ),
    updateMetaStore: (meta) => dispatch(updateMetaStore(meta)),
    setHeaderState: (stateName) => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName),
    ),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs),
        );
    },
});

/** @namespace Route/ContactPage/Container */
export class ContactPageContainer extends DataContainer<ContactPageContainerProps, ContactPageContainerState> {
    state: ContactPageContainerState = {
        isLoading: false,
        isEnabled: false,
    };

    __construct(props: ContactPageContainerProps): void {
        super.__construct(props, 'ContactPageContainer');

        this.updateBreadcrumbs();
    }

    componentDidMount(): void {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeader();
        this.getEnabledState();
    }

    containerProps(): Pick<ContactPageComponentProps, 'isMobile' | 'isLoading' | 'isEnabled'> {
        const { isMobile } = this.props;
        const { isLoading, isEnabled } = this.state;

        return {
            isMobile,
            isLoading,
            isEnabled,
        };
    }

    updateMeta(): void {
        const { updateMetaStore } = this.props;

        updateMetaStore({ title: __('Contact Us') });
    }

    updateBreadcrumbs(): void {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/contact-us',
                name: __('Contact Us'),
            },
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    updateHeader(): void {
        const { setHeaderState } = this.props;

        setHeaderState({
            name: Page.CONTACT_US,
            title: __('Contact Us'),
        });
    }

    getEnabledState(): void {
        const { showNotification } = this.props;

        this.setState({ isLoading: true });

        this.fetchData<{ contactPageConfig: { enabled: boolean } }>(
            [ContactFormQuery.getContactPageConfigQuery()],
            ({ contactPageConfig: { enabled = false } = {} }) => {
                this.setState({ isEnabled: enabled, isLoading: false });
            },
            (e) => {
                this.setState({ isLoading: false });
                showNotification(NotificationType.ERROR, getErrorMessage(e as Error));
            },
        );
    }

    render(): ReactElement {
        return (
            <ContactPage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPageContainer);
