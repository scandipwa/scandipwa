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

export type HighEntropyClientHints = |
    'architecture' |
    'bitness' |
    'model' |
    'platform' |
    'platformVersion' |
    'uaFullVersion'

declare global {
    interface NavigatorUAData {
        readonly brands: string[]
        readonly mobile: boolean
        readonly platform: string
        getHighEntropyValues<T extends HighEntropyClientHints[]>(hints: T): Promise<
            {
                [K in T[number]]: string
            }
        >
    }

    interface Navigator {
        userAgentData?: NavigatorUAData
    }
}
