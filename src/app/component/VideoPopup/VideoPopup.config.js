/* eslint-disable import/prefer-default-export */

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

export const VIDEO_POPUP_ID = 'VIDEO_POPUP_ID';

/**
 * An expression that checks for vimeo URLs described in https://developer.vimeo.com/api/oembed/videos#table-1 and matches the video id
 * @type {RegExp}
 */
export const VIMEO_FORMAT = new RegExp('(?:https?//)?vimeo.com[\\w/]*/(\\d+)$');
export const YOUTUBE_FORMAT = new RegExp('(?:https?//)?www.youtube.com/watch\\?v=(\\w+)');
