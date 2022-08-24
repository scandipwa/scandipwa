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

import { Buffer } from 'buffer';

/** @namespace Util/Base64/encodeBase64 */
export const encodeBase64 = (data: string): string => Buffer.from(data).toString('base64');

/** @namespace Util/Base64/decodeBase64 */
export const decodeBase64 = (data: string): string => Buffer.from(data, 'base64').toString('utf8');
