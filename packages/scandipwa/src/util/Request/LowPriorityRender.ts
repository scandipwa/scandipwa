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

import {
    ComponentType,
    lazy,
    useEffect,
    useState,
} from 'react';

import { ReactElement } from 'Type/Common.type';

import { EV_PRIORITY_LOAD_END } from './Config';
import { waitForPriorityLoad } from './LowPriorityLoad';

/** @namespace Util/Request/LowPriorityRender/lowPriorityLazy */
export const lowPriorityLazy = (callback: () => Promise<{ default: ComponentType<any> }>) => lazy(async () => {
    await waitForPriorityLoad();

    const ev = new Event(EV_PRIORITY_LOAD_END);
    document.dispatchEvent(ev);

    return callback();
});

/** @namespace Util/Request/LowPriorityRender/AfterPriority */

export function AfterPriority(
    { children, fallback }: { children: ReactElement; fallback: ReactElement },
): ReactElement {
    const [isPriorityLoaded, setIsPriorityLoaded] = useState(window.isPriorityLoaded);

    function onPriorityLoad() {
        setIsPriorityLoaded(true);
    }

    useEffect(() => {
        document.addEventListener(EV_PRIORITY_LOAD_END, onPriorityLoad, { once: true });

        return () => {
            document.removeEventListener(EV_PRIORITY_LOAD_END, onPriorityLoad);
        };
    }, []);

    if (!isPriorityLoaded) {
        return fallback;
    }

    return children;
}
