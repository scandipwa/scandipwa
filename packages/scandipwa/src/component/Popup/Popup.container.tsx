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

import { Page } from 'Component/Header/Header.config';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay, hideActivePopup } from 'Store/Overlay/Overlay.action';
import { PopupPayload } from 'Store/Popup/Popup.type';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import Popup from './Popup.component';
import {
    PopupComponentProps,
    PopupContainerFunctions,
    PopupContainerMapDispatchProps,
    PopupContainerMapStateProps,
    PopupContainerProps,
    PopupContainerPropsKeys,
} from './Popup.type';

export const NavigationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Navigation/Navigation.dispatcher'
);

/** @namespace Component/Popup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): PopupContainerMapStateProps => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    shouldPopupClose: state.PopupReducer.shouldPopupClose,
    payload: state.PopupReducer.popupPayload as PopupPayload,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/Popup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): PopupContainerMapDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    resetHideActivePopup: () => dispatch(hideActivePopup(false)),
    changeHeaderState: (state) => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state),
    ),
    goToPreviousNavigationState: () => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE),
    ),
});

/** @namespace Component/Popup/Container */
export class PopupContainer extends PureComponent<PopupContainerProps> {
    static defaultProps: Partial<PopupContainerProps> = {
        onVisible: noopFn,
        onClose: noopFn,
        onHide: noopFn,
        mix: {},
        contentMix: {},
        children: [],
        isStatic: false,
        isCloseOnOutsideClick: true,
    };

    containerFunctions: PopupContainerFunctions = {
        onVisible: this.onVisible.bind(this),
    };

    onVisible(): void {
        const { changeHeaderState, onVisible } = this.props;

        changeHeaderState({
            name: Page.POPUP,
            title: this._getPopupTitle(),
            onCloseClick: () => {
                history.goBack();
            },
        });

        onVisible();
    }

    containerProps(): Pick<
    PopupComponentProps,
    PopupContainerPropsKeys
    > {
        const {
            isCloseOnOutsideClick,
            activeOverlay,
            areOtherOverlaysOpen,
            changeHeaderState,
            children,
            id,
            isMobile,
            isStatic,
            mix,
            contentMix,
            onClose,
            onHide,
            shouldPopupClose,
            hideActiveOverlay,
            resetHideActivePopup,
            goToPreviousNavigationState,
        } = this.props;

        return {
            isCloseOnOutsideClick,
            activeOverlay,
            areOtherOverlaysOpen,
            changeHeaderState,
            children,
            id,
            isMobile,
            isStatic,
            mix,
            contentMix,
            shouldPopupClose,
            onClose,
            onHide,
            hideActiveOverlay,
            resetHideActivePopup,
            goToPreviousNavigationState,
            title: this._getPopupTitle(),
        };
    }

    _getPopupTitle(): string | undefined {
        const { payload, activeOverlay } = this.props;
        const { title } = payload[ activeOverlay as keyof PopupPayload ] || {};

        return title;
    }

    render(): ReactElement {
        return (
            <Popup
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
