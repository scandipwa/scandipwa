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

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { createPortal } from 'react-dom';

import { ChildrenType, MixType } from 'Type/Common.type';
import { toggleScroll } from 'Util/Browser';
import { noopFn } from 'Util/Common';

import './Overlay.style';

/** @namespace Component/Overlay/Component */
export class Overlay extends PureComponent {
    static propTypes = {
        mix: MixType,
        id: PropTypes.string.isRequired,
        onVisible: PropTypes.func,
        onHide: PropTypes.func,
        activeOverlay: PropTypes.string.isRequired,
        areOtherOverlaysOpen: PropTypes.bool.isRequired,
        isStatic: PropTypes.bool,
        isRenderInPortal: PropTypes.bool,
        children: ChildrenType,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        mix: {},
        children: [],
        onVisible: noopFn,
        isStatic: false,
        onHide: noopFn,
        isRenderInPortal: true
    };

    overlayRef = createRef();

    componentDidUpdate(prevProps) {
        const prevWasVisible = this.getIsVisible(prevProps);
        const isVisible = this.getIsVisible();

        if (isVisible && !prevWasVisible) {
            this.onVisible();
        }

        if (!isVisible && prevWasVisible) {
            this.onHide();
        }
    }

    onVisible() {
        const { onVisible, isStatic, isMobile } = this.props;

        if (isStatic) {
            return;
        }

        if (isMobile) {
            this.freezeScroll();
        }

        this.overlayRef.current.focus();
        onVisible();
    }

    onHide() {
        const { onHide, isStatic, isMobile } = this.props;

        if (isStatic) {
            return;
        }

        if (isMobile) {
            this.unfreezeScroll();
        }
        onHide();
    }

    getIsVisible(props = this.props) {
        const { id, activeOverlay, isStatic } = props;

        return isStatic || id === activeOverlay;
    }

    freezeScroll() {
        this.YoffsetWhenScrollDisabled = window.pageYOffset || document.body.scrollTop;
        toggleScroll(false);
        document.body.style.marginTop = `${-this.YoffsetWhenScrollDisabled}px`;
    }

    unfreezeScroll() {
        toggleScroll(true);
        document.body.style.marginTop = 0;
        window.scrollTo(0, this.YoffsetWhenScrollDisabled);
    }

    renderInMobilePortal(content) {
        const { isStatic, isRenderInPortal, isMobile } = this.props;

        if (!isStatic && isMobile && isRenderInPortal) {
            return createPortal(content, document.body);
        }

        return content;
    }

    render() {
        const {
            children,
            mix,
            areOtherOverlaysOpen,
            isStatic
        } = this.props;

        const isVisible = this.getIsVisible();

        return this.renderInMobilePortal(
            <div
              block="Overlay"
              ref={ this.overlayRef }
              mods={ { isVisible, isStatic, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix.mods, isVisible } } }
            >
                { children && children }
            </div>
        );
    }
}

export default Overlay;
