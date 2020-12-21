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

import { Container } from 'unstated';

export const sharedTransitionInitialState = {
    sharedElementDestination: null,
    sharedElement: null,
    destinationPosition: {},
    startingPosition: {}
};

/** @namespace Component/SharedTransition/Unstated */
export class SharedTransitionUnstated extends Container {
    state = sharedTransitionInitialState;

    _parseRectangle = (val) => JSON.parse(JSON.stringify(val));

    cleanUpTransition = () => {
        this.setState(sharedTransitionInitialState);
    };

    registerSharedElementDestination = ({ current }) => {
        if (current) {
            this.setState(({ sharedElementDestination }) => {
                if (sharedElementDestination) {
                    return {};
                }

                return {
                    sharedElementDestination: current,
                    destinationPosition: this._parseRectangle(current.getBoundingClientRect())
                };
            });
        }
    };

    registerSharedElement = ({ current }) => {
        if (current) {
            const clone = current.cloneNode(true);

            this.setState({
                sharedElement: clone,
                sharedElementDestination: null,
                destinationPosition: {},
                startingPosition: this._parseRectangle(current.getBoundingClientRect())
            });
        }
    };
}

export default new SharedTransitionUnstated();
