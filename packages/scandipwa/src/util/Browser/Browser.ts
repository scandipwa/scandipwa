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

// eslint-disable-next-line max-len
export const crawlerRegEx = /(adsbot-google|ahrefsbot|azamatbot|baiduspider|bingbot|bitlybot|discordbot|duckduckgo|embedly|facebookexternalhit|flipboard|google|google-structured-data-testing-tool|googlebot|imgproxy|lighthouse|linabot|linkedinbot|mail\.ru|mediapartners-google|nuzzel|outbrain|pinterest|pinterestbot|quora link preview|qwantify|redditbot|rogerbot|rsiteauditor|scandibot|showyoubot|skype|slackbot|slurp|telegrambot|tumblr|twitterbot|vkshare|w3c_validator|whatsapp|yandex)/gmi;

/** @namespace Util/Browser/isSSR */
export const isSSR = (): boolean => !globalThis.window || !globalThis.window.document;

/** @namespace Util/Browser/isCrawler */
export const isCrawler = (): boolean => crawlerRegEx.test(navigator.userAgent);

/** @namespace Util/Browser/toggleScroll */
// eslint-disable-next-line max-len
export const toggleScroll = (state: boolean): boolean => document.documentElement.classList.toggle('scrollDisabled', !state);

/** @namespace Util/Browser/isScrollDisabled */
export const isScrollDisabled = (): boolean => document.documentElement.classList.contains('scrollDisabled');

/** @namespace Util/Browser/scrollToTop */
export const scrollToTop = (options: ScrollToOptions = {}): void => window.scrollTo({ ...options, top: 0 });
