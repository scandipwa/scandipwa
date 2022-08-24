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

import { createRef, PureComponent } from 'react';
import { createPortal } from 'react-dom';

import { ReactElement } from 'Type/Common.type';
import { toggleScroll } from 'Util/Browser';
import { noopFn } from 'Util/Common';

import { OverlayComponentProps } from './Overlay.type';

import './Overlay.style';

/** @namespace Component/Overlay/Component */
export class Overlay<P extends OverlayComponentProps = OverlayComponentProps> extends PureComponent<P> {
    static defaultProps: Partial<OverlayComponentProps> = {
        mix: {},
        contentMix: {},
        children: [],
        onVisible: noopFn,
        isStatic: false,
        onHide: noopFn,
        onClose: noopFn,
        isRenderInPortal: true
    };

    overlayRef = createRef<HTMLDivElement>();

    YoffsetWhenScrollDisabled = window.pageYOffset || document.body.scrollTop;

    componentDidUpdate(prevProps: P): void {
        const prevWasVisible = this.getIsVisible(prevProps);
        const isVisible = this.getIsVisible();

        if (isVisible && !prevWasVisible) {
            this.onVisible();
        }

        if (!isVisible && prevWasVisible) {
            this.onHide();
        }
    }

    onVisible(): void {
        const { onVisible, isStatic, isMobile } = this.props;

        if (isStatic || !onVisible) {
            return;
        }

        if (isMobile) {
            this.freezeScroll();
        }

        this.overlayRef.current?.focus();

        if (onVisible) {
            onVisible();
        }
    }

    onHide(): void {
        const { onHide, isStatic, isMobile } = this.props;

        if (isStatic) {
            return;
        }

        if (isMobile) {
            this.unfreezeScroll();
        }

        if (onHide) {
            onHide();
        }
    }

    getIsVisible(props: P = this.props): boolean {
        const { id, activeOverlay, isStatic } = props;

        return isStatic || id === activeOverlay;
    }

    freezeScroll(): void {
        toggleScroll(false);
        document.body.style.marginTop = `${-this.YoffsetWhenScrollDisabled}px`;
    }

    unfreezeScroll(): void {
        toggleScroll(true);
        document.body.style.marginTop = '0';
        window.scrollTo(0, this.YoffsetWhenScrollDisabled);
    }

    renderInMobilePortal(content: ReactElement): ReactElement {
        const { isStatic, isRenderInPortal, isMobile } = this.props;

        if (!isStatic && isMobile && isRenderInPortal) {
            return createPortal(content, document.body);
        }

        return content;
    }

    render(): ReactElement {
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
              mix={ { ...mix, mods: { ...(mix?.mods || {}), isVisible } } }
            >
                { children && children }
            </div>
        );
    }
}

export default Overlay;
