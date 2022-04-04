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

/** @namespace Util/FormPortalCollector/Index */
export class FormPortalCollector <
    T extends string,
    U extends () => void,
    S extends string
> {
    portalsObservers: Record<string, Record<string, U>> = {};

    subscribe(id: T, f: U, name: S): void {
        if (this.portalsObservers[id]) {
            this.portalsObservers[id][name] = f;

            return;
        }

        this.portalsObservers[id] = { [name]: f };
    }

    unsubscribe(id: T, name: S): void {
        if (!this.portalsObservers[id]) {
            return;
        }
        // eslint-disable-next-line fp/no-delete
        delete this.portalsObservers[id][name];
    }

    collect(id: S) {
        const portals = this.portalsObservers[id] || {};

        return Object.values(portals).map((portal) => portal());
    }
}

export default FormPortalCollector;
