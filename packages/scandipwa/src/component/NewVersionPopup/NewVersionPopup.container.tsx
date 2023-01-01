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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import NewVersionPopup from './NewVersionPopup.component';
import { NEW_VERSION_POPUP_ID } from './NewVersionPopup.config';
import {
    NewVersionPopupContainerFunctions,
    NewVersionPopupContainerMapDispatchProps,
    NewVersionPopupContainerMapStateProps,
    NewVersionPopupContainerProps,
} from './NewVersionPopup.type';

/** @namespace Component/NewVersionPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NewVersionPopupContainerMapStateProps => ({
    device: state.ConfigReducer.device,
});

/** @namespace Component/NewVersionPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NewVersionPopupContainerMapDispatchProps => ({
    showPopup: (payload) => dispatch(showPopup(NEW_VERSION_POPUP_ID, payload)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
});

/** @namespace Component/NewVersionPopup/Container */
export class NewVersionPopupContainer<
P extends Readonly<NewVersionPopupContainerProps> = Readonly<NewVersionPopupContainerProps>,
S extends NewVersionPopupContainerState = NewVersionPopupContainerState,
> extends PureComponent<P, S> {
    containerFunctions: NewVersionPopupContainerFunctions = {
        toggleNewVersion: this.toggleNewVersion.bind(this),
        handleDismiss: this.handleDismiss.bind(this),
    };

    componentDidMount(): void {
        const { showPopup, goToPreviousHeaderState, device } = this.props;

        if (isCrawler() || isSSR()) {
            // disable popup for crawlers so page content is not blocked and page is scrollable
            return;
        }

        const { serviceWorker: { controller } = {} } = navigator;

        if (!controller) {
            return;
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                showPopup({
                    title: __('New version available!'),
                });

                if (device.isMobile) {
                    goToPreviousHeaderState();
                }
            });
        }
    }

    toggleNewVersion(): void {
        window.location.reload();
    }

    handleDismiss(): void {
        const { hideActiveOverlay } = this.props;

        hideActiveOverlay();
        history.goBack();
    }

    render(): ReactElement {
        return (
            <NewVersionPopup
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVersionPopupContainer);
