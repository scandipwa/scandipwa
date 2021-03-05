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
import { connect } from 'react-redux';

import { CONTACT_US } from 'Component/Header/Header.config';
import ContactFormQuery from 'Query/ContactForm.query';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import DataContainer from 'Util/Request/DataContainer';

import ContactPage from './ContactPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/ContactPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Route/ContactPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    }
});

/** @namespace Route/ContactPage/Container */
export class ContactPageContainer extends DataContainer {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    state = {
        isLoading: false,
        isEnabled: false
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeader();
        this.getEnabledState();
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Contact Us') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/contact-us',
                name: __('Contact Us')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    updateHeader() {
        const { setHeaderState } = this.props;

        setHeaderState({
            name: CONTACT_US,
            title: __('Contact Us')
        });
    }

    getEnabledState() {
        const { showNotification } = this.props;
        this.setState({ isLoading: true });

        this.fetchData(
            ContactFormQuery.getContactPageConfigQuery(),
            ({ contactPageConfig: { enabled } = {} }) => {
                this.setState({ isEnabled: enabled, isLoading: false });
            },
            ([e]) => {
                this.setState({ isLoading: false });
                showNotification(e.message);
            }
        );
    }

    render() {
        return (
            <ContactPage
              { ...this.state }
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPageContainer);
