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
import SharedTransitionContainer from './SharedTransition.unstated';

export default (props) => (
    <Subscribe to={ [SharedTransitionContainer] }>
        { (sharedTransition) => (
            <SharedTransition
              { ...props }
              { ...sharedTransition }
            />
        ) }
    </Subscribe>
);
