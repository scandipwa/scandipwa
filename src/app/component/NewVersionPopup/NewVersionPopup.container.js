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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showPopup } from 'Store/Popup';

import { goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import isMobile from 'Util/Mobile';

import NewVersionPopup, {
    NEW_VERSION_POPUP_ID
} from './NewVersionPopup.component';

export const mapDispatchToProps = dispatch => ({
    showPopup: payload => dispatch(showPopup(NEW_VERSION_POPUP_ID, payload)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

export class NewVersionPopupContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired
    };

    containerFunctions = {
        toggleNewVersion: this.toggleNewVersion.bind(this)
    };

    componentDidMount() {
        const { showPopup, goToPreviousHeaderState } = this.props;

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                showPopup({
                    title: __('New version available!')
                });

                if (isMobile.any()) {
                    goToPreviousHeaderState();
                }
            });
        }
    }

    toggleNewVersion() {
        window.location.reload();
    }

    render() {
        return (
            <NewVersionPopup
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(NewVersionPopupContainer);
