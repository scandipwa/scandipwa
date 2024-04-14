// @ts-nocheck
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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

// TODO: implement props passing

import { Subscribe } from 'unstated-typescript';

import SharedTransition from './SharedTransition.component';
import SharedTransitionContainer from './SharedTransition.unstated';

/** @namespace Component/SharedTransition/Container/SharedTransitionWrapper */
export function SharedTransitionWrapper(props: Record<string, any>): JSX.Element {
    return (
        <Subscribe to={ [SharedTransitionContainer] }>
            { (sharedTransition) => (
                <SharedTransition
                  { ...props }
                  { ...sharedTransition }
                />
            ) }
        </Subscribe>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default SharedTransitionWrapper;
