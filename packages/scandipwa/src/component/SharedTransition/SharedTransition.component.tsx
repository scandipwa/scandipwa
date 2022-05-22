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

import { createRef, PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import { SHARED_ELEMENT_TRANSITION } from './SharedTransition.config';
import { SharedTransitionComponentProps } from './SharedTransition.type';

import './SharedTransition.style';

/** @namespace Component/SharedTransition/Component */
export class SharedTransition extends PureComponent<SharedTransitionComponentProps> {
    sharedContainer = createRef<HTMLDivElement>();

    animationSpeed = SHARED_ELEMENT_TRANSITION;

    transitionInAction = false;

    setDestinationTransform = this.setTransform.bind(this, 'destinationPosition');

    setStartingTransform = this.setTransform.bind(this, 'startingPosition');

    __construct(props: SharedTransitionComponentProps): void {
        super.__construct?.(props);

        this.cleanUpTransition = this.cleanUpTransition.bind(this);
    }

    componentDidUpdate(): void {
        if (this.transitionInAction) {
            return;
        }
        this.updateSharedElement();
    }

    setTransform(key: 'startingPosition' | 'destinationPosition'): void {
        const {
            state: {
                [key]: {
                    width,
                    height,
                    left,
                    top
                }
            }
        } = this.props;

        if (this.sharedContainer.current) {
            this.sharedContainer.current.style.cssText = `
                --shared-element-width: ${width}px;
                --shared-element-height: ${height}px;
                --shared-element-top: ${top}px;
                --shared-element-start: ${left}px;
                --shared-element-animation-speed: ${this.animationSpeed}ms;
            `;
        }
    }

    cleanUpTransition(): void {
        const { current: wrapper } = this.sharedContainer;
        const { cleanUpTransition } = this.props;

        if (wrapper) {
            const range = document.createRange();
            range.selectNodeContents(wrapper);
            range.deleteContents();
        }

        this.transitionInAction = false;
        cleanUpTransition();
    }

    updateSharedElement(): void {
        const {
            state: {
                sharedElementDestination,
                sharedElement
            }
        } = this.props;

        const { current: wrapper } = this.sharedContainer;

        if (
            !sharedElement
            || !sharedElementDestination
            || !wrapper
        ) {
            // this.cleanUpTransition();
            return;
        }

        this.transitionInAction = true;
        this.setStartingTransform();
        wrapper.appendChild(sharedElement);
        setTimeout(this.setDestinationTransform, 0);
        setTimeout(this.cleanUpTransition, this.animationSpeed);
    }

    render(): ReactElement {
        const { state: { sharedElement } } = this.props;

        return (
            <div
              block="SharedTransition"
              mods={ { isVisible: !!sharedElement } }
              ref={ this.sharedContainer }
            />
        );
    }
}

export default SharedTransition;
