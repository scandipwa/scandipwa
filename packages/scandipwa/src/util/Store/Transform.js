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

export const transformCountriesToOptions = (countries) => (
    countries.map((country) => {
        const { id } = country;
        return {
            value: id,
            name: id,
            ...country
        };
    })
);

export default transformCountriesToOptions;
