/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface SharedTransitionComponentProps {
    state: SharedTransitionState;
    cleanUpTransition: () => void;
}

export interface SharedTransitionState {
    startingPosition: Partial<SharedTransitionPosition>;
    destinationPosition: Partial<SharedTransitionPosition>;
    sharedElementDestination: HTMLElement | null;
    sharedElement: HTMLElement | null;
}

export interface SharedTransitionPosition {
    width: number;
    height: number;
    left: number;
    top: number;
}
