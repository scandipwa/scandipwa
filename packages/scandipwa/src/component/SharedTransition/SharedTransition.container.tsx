/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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

// TODO: implement props passing

import { Subscribe } from 'unstated';

import SharedTransition from './SharedTransition.component';
import { SharedTransitionComponentProps } from './SharedTransition.type';
import SharedTransitionContainer from './SharedTransition.unstated';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (props: Record<string, any>): JSX.Element => (
    <Subscribe to={ [SharedTransitionContainer] }>
        { (sharedTransition) => (
            <SharedTransition
              { ...props }
              { ...(sharedTransition as unknown as SharedTransitionComponentProps) }
            />
        ) }
    </Subscribe>
);
