/* eslint-disable react/no-unused-prop-types */

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

import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Overlay from 'Component/Overlay/Overlay.component';
import ClickOutside from 'Component/ClickOutside';
import './Popup.style';

export default class Popup extends Overlay {
    static propTypes = {
        ...Overlay.propTypes,
        clickOutside: PropTypes.bool,
        title: PropTypes.string
    };

    static defaultProps = {
        ...Popup.defaultProps,
        clickOutside: true,
        title: ''
    };

    onVisible() {
        const { onVisible } = this.props;
        this.freezeScroll();
        this.overlayRef.current.focus();
        onVisible();
    }

    onHide() {
        const { onHide } = this.props;
        this.unfreezeScroll();
        onHide();
    }

    hidePopUp = () => {
        const { hideActiveOverlay } = this.props;
        const isVisible = this.getIsVisible();
        if (isVisible) hideActiveOverlay();
    };

    handleClickOutside = () => {
        const { clickOutside } = this.props;
        if (!clickOutside) return;
        this.hidePopUp();
    };

    renderTitle() {
        const { title } = this.props;
        if (!title) return null;

        return (
            <h3 block="Popup" elem="Heading">
                { title }
            </h3>
        );
    }

    renderContent() {
        const { children } = this.props;
        const isVisible = this.getIsVisible();

        if (!isVisible) return null;

        return (
            <ClickOutside onClick={ this.handleClickOutside }>
                <div block="Popup" elem="Content">
                    <header block="Popup" elem="Header">
                        { this.renderTitle() }
                        <button
                          block="Popup"
                          elem="CloseBtn"
                          title="Close Popup"
                          onClick={ this.hidePopUp }
                        />
                    </header>
                    { children }
                </div>
            </ClickOutside>
        );
    }

    render() {
        const { mix, areOtherOverlaysOpen } = this.props;
        const isVisible = this.getIsVisible();

        return createPortal(
            <div
              ref={ this.overlayRef }
              block="Popup"
              mods={ { isVisible, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix.mods, isVisible } } }
            >
                { this.renderContent() }
            </div>,
            document.body
        );
    }
}
