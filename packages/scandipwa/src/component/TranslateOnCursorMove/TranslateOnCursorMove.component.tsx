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

import { ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';

import { TranslateOnCursorMoveComponentProps } from './TranslateOnCursorMove.type';

import './TranslateOnCursorMove.style';

/** @namespace Component/TranslateOnCursorMove/Component */
export class TranslateOnCursorMoveComponent extends PureComponent<TranslateOnCursorMoveComponentProps> {
    ref = createRef<HTMLDivElement>();

    __construct(props: TranslateOnCursorMoveComponentProps): void {
        super.__construct?.(props);

        this.handleLoad = this.handleLoad.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleLoad);
    }

    componentDidUpdate(prevProps: TranslateOnCursorMoveComponentProps): void {
        const { activeImageId } = this.props;
        const { activeImageId: prevActiveImageId } = prevProps;

        if (activeImageId !== prevActiveImageId) {
            this.handleLoad();
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleLoad);
        CSS.setVariable(this.ref, 'translateYOnCursorMove', '0');
    }

    handleLoad(): void {
        const {
            activeImageId,
            itemSelector,
            targetSelector,
        } = this.props;

        const targets = this.ref.current?.querySelectorAll<HTMLElement>(itemSelector);
        const target = targets?.[activeImageId]?.querySelector<HTMLElement>(targetSelector);

        if (!target) {
            return;
        }

        const innerHeight = target.getBoundingClientRect().height;
        const { height: wrapperHeight = 0 } = this.ref.current?.getBoundingClientRect() || {};
        const translate = (wrapperHeight - innerHeight) / 2;

        // style set directly (not via `setVariable`) as different translate Y values have to be applied at the same time
        // (as 2 slider images are shown simultaneously when navigating to next/previous image)
        target.style.transform = `translateY(${translate}px)`;
        CSS.setVariable(this.ref, 'imageOpacity', '1');
    }

    handleMouseMove({ pageY: wrapperPageY }: { pageY: number }): void {
        const {
            activeImageId,
            itemSelector,
            targetSelector,
        } = this.props;

        // Space from top and bottom to shrink mouse move watch area
        const paddingY = 90;

        const target = this.ref.current
            ?.querySelectorAll<HTMLElement>(itemSelector)?.[activeImageId]
            ?.querySelector<HTMLElement>(targetSelector);

        if (!target) {
            return;
        }

        const innerHeight = target.getBoundingClientRect().height;
        const { height: wrapperHeight = 0, top = 0 } = this.ref.current?.getBoundingClientRect() || {};

        const pageY = wrapperPageY - top;

        // When mouse is reached top or bottom
        if (wrapperPageY < paddingY + top || (wrapperPageY > (wrapperHeight + top - paddingY))) {
            return;
        }

        const ratio = (innerHeight - wrapperHeight) / (wrapperHeight - (paddingY * 2));
        const translate = (pageY - paddingY) * ratio;

        if (innerHeight <= wrapperHeight) {
            return;
        }

        target.style.transform = `translateY(-${translate}px)`;
    }

    render(): ReactElement {
        const { children, isMobile } = this.props;

        if (isMobile) {
            return children;
        }

        return (
            <div
              block="TranslateOnCursorMove"
              // TODO: investigate why does this work ???
              // eslint-disable-next-line react/no-unknown-property
              onLoad={ this.handleLoad }
              onMouseMove={ this.handleMouseMove }
              ref={ this.ref }
            >
                { children }
            </div>
        );
    }
}

export default TranslateOnCursorMoveComponent;
