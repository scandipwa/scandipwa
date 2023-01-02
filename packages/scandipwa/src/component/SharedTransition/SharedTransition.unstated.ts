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

import { RefObject } from 'react';
import { Container } from 'unstated-typescript';

import { SharedTransitionPosition, SharedTransitionState } from './SharedTransition.type';

export const sharedTransitionInitialState: SharedTransitionState = {
    sharedElementDestination: null,
    sharedElement: null,
    destinationPosition: {},
    startingPosition: {},
};

/** @namespace Component/SharedTransition/Unstated */
export class SharedTransitionUnstated extends Container<SharedTransitionState> {
    state: SharedTransitionState = sharedTransitionInitialState;

    __construct(): void {
        this.registerSharedElementDestination = this.registerSharedElementDestination.bind(this);
        this.registerSharedElement = this.registerSharedElement.bind(this);
    }

    _parseRectangle(val: DOMRect): SharedTransitionPosition {
        return JSON.parse(JSON.stringify(val));
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-arrow-functions-in-class
    cleanUpTransition = (): void => {
        this.setState(sharedTransitionInitialState);
    };

    registerSharedElementDestination({ current }: RefObject<HTMLElement>): void {
        if (current) {
            this.setState(({ sharedElementDestination }) => {
                if (sharedElementDestination) {
                    return {};
                }

                return {
                    sharedElementDestination: current,
                    destinationPosition: this._parseRectangle(current.getBoundingClientRect()),
                };
            });
        }
    }

    registerSharedElement({ current }: RefObject<HTMLElement>): void {
        if (current) {
            const clone = current.cloneNode(true) as HTMLElement;

            this.setState({
                sharedElement: clone,
                sharedElementDestination: null,
                destinationPosition: {},
                startingPosition: this._parseRectangle(current.getBoundingClientRect()),
            });
        }
    }
}

export default new SharedTransitionUnstated();
