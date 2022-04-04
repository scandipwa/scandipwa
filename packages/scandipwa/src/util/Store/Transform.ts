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

import { Countries } from "Type/Config.type";

/**
 * Transforms countries list into select options
 * @param countries
 * @namespace Util/Store/Transform/transformCountriesToOptions
 */
export const transformCountriesToOptions = (countries: Countries): Countries => {
    const options = countries.map((country) => {
        const { id } = country;

        return {
            value: id,
            name: id,
            ...country
        };
    });

    const filtered = options.filter(({ label }) => label);

    const sorted = filtered.sort(
        ({ label }, { label: labelCompare }) => label.localeCompare(labelCompare)
    );

    return sorted;
};

export default transformCountriesToOptions;
