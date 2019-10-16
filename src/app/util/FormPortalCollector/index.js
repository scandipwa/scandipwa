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

export default class FormPortalCollector {
    portalsObservers = {};

    subscribe(id, f) {
        if (this.portalsObservers[id]) {
            this.portalsObservers[id].push(f);
            return;
        }

        this.portalsObservers[id] = [f];
    }

    unsubscribe(id, f) {
        const portalObservers = this.portalsObservers[id];
        if (!portalObservers) return;
        this.portalsObservers = this.portalsObservers[id].filter(portal => portal !== f);
    }

    collect(id) {
        const portals = this.portalsObservers[id] || [];
        return portals.map(portal => portal());
    }
}
