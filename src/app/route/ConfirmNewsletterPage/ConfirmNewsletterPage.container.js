/* eslint-disable fp/no-let */

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
import PropTypes from 'prop-types';

import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { showNotification } from 'Store/Notification';
import { updateMeta } from 'Store/Meta';

import { LocationType } from 'Type/Router';

import ConfirmNewsletterPage from './ConfirmNewsletterPage.component';

export const mapDispatchToProps = dispatch => ({
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    },
    updateMeta: meta => dispatch(updateMeta(meta)),
    confirmNewsletter: options => MyAccountDispatcher.confirmNewsletter(options, dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class ConfirmNewsletterPageContainer extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        updateMeta: PropTypes.func.isRequired,
        confirmNewsletter: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Confirm Newsletter') });

        this.requestConfirmNewsletter();
        this._updateBreadcrumbs();
    }

    requestConfirmNewsletter() {
        const {
            location: { pathname },
            confirmNewsletter
        } = this.props;

        // https://example.com/newsletter/subscriber/confirm/id/2478/code/ukt2v6a4wjzyt5qgygalq0izbhkj1ki2/

        let id = pathname.split('id')[1];
        let code = pathname.split('code')[1];

        if (!id || !code) {
            history.push({ pathname: '/' });
            showNotification('error', __('The current link is not right. Try click on the link in the mail again'));

            return;
        }

        id = id.split('/')[1];
        code = code.split('/')[1];

        confirmNewsletter({ id, code });
    }

    _updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/account/confirmAccount',
                name: __('Confirm Newsletter')
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }


    render() {
        return (
            <ConfirmNewsletterPage />
        );
    }
}

export default connect(null, mapDispatchToProps)(ConfirmNewsletterPageContainer);
