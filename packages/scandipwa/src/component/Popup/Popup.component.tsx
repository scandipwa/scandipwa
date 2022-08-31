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

import { createPortal } from 'react-dom';

import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import NotificationList from 'Component/NotificationList';
import Overlay from 'Component/Overlay/Overlay.component';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';

import { ESCAPE_KEY } from './Popup.config';
import { PopupComponentProps } from './Popup.type';

import './Popup.style';

/** @namespace Component/Popup/Component */
export class Popup extends Overlay<PopupComponentProps> {
    static defaultProps: Partial<PopupComponentProps> = {
        ...Overlay.defaultProps,
        clickOutside: true,
        title: ''
    };

    __construct(props: PopupComponentProps): void {
        super.__construct?.(props);

        this.hidePopUp = this.hidePopUp.bind(this);
        this.hidePopupAndGoBack = this.hidePopupAndGoBack.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount(): void {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    componentDidUpdate(prevProps: PopupComponentProps): void {
        const { shouldPopupClose, resetHideActivePopup } = this.props;
        const { shouldPopupClose: prevShouldPopupClose } = prevProps;

        if (shouldPopupClose && shouldPopupClose !== prevShouldPopupClose) {
            this.hidePopUp();
            resetHideActivePopup();
        }

        super.componentDidUpdate(prevProps);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }

    onVisible(): void {
        const { onVisible } = this.props;

        this.freezeScroll();
        this.overlayRef.current?.focus();

        window.addEventListener('popstate', this.hidePopUp);

        window.history.pushState(
            `${location.pathname}${location.search}${location.hash}`,
            { popupOpen: true }
        );

        onVisible?.();
    }

    onHide(): void {
        const { onHide } = this.props;

        window.removeEventListener('popstate', this.hidePopUp);

        this.unfreezeScroll();

        onHide?.();
    }

    hidePopUp(): void {
        const { hideActiveOverlay, goToPreviousNavigationState, onClose } = this.props;
        const isVisible = this.getIsVisible();

        if (isVisible) {
            this.unfreezeScroll();
            hideActiveOverlay();
            goToPreviousNavigationState();
            onClose?.();
        }
    }

    hidePopupAndGoBack(): void {
        this.hidePopUp();
        history.goBack();
    }

    // Same with click outside
    handleClickOutside(): void {
        const { clickOutside, isMobile } = this.props;

        if (!clickOutside) {
            return;
        }

        if (isMobile) {
            return;
        }

        this.hidePopupAndGoBack();
    }

    handleKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
        case ESCAPE_KEY:
            this.hidePopupAndGoBack();
            break;
        default:
            break;
        }
    }

    renderTitle(): ReactElement {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return (
            <h3 block="Popup" elem="Heading">
                { title }
            </h3>
        );
    }

    renderCloseButton(): ReactElement {
        return (
            <button
              block="Popup"
              elem="CloseBtn"
              aria-label={ __('Close') }
              onClick={ this.hidePopupAndGoBack }
            >
                <CloseIcon />
            </button>
        );
    }

    renderNotifications(): ReactElement {
        const { isMobile } = this.props;

        if (!isMobile) {
            return null;
        }

        return <NotificationList />;
    }

    renderContent(): ReactElement {
        const { children, contentMix } = this.props;
        const isVisible = this.getIsVisible();

        if (!isVisible) {
            return null;
        }

        return (
            <ClickOutside onClick={ this.handleClickOutside }>
                <div block="Popup" elem="Content" mix={ contentMix }>
                    <header block="Popup" elem="Header">
                        { this.renderTitle() }
                        { this.renderCloseButton() }
                    </header>
                    { this.renderNotifications() }
                    { children }
                </div>
            </ClickOutside>
        );
    }

    render(): ReactElement {
        const { mix, areOtherOverlaysOpen } = this.props;
        const isVisible = this.getIsVisible();

        return createPortal(
            <div
              ref={ this.overlayRef }
              block="Popup"
              mods={ { isVisible, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix?.mods, isVisible } } }
            >
                { this.renderContent() }
            </div>,
            document.body
        );
    }
}

export default Popup;
