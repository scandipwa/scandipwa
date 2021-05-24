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

import facebookIcon from './images/facebook.png';
import linkedinIcon from './images/linkedin.png';
import twitterIcon from './images/twitter.png';

export const RENDER_NEWSLETTER = 'render_newsletter';

export const NEWSLETTER_COLUMN = {
    title: __('Newsletter'),
    columnActiveKey: 'newsletterActive',
    items: [
        {
            render: RENDER_NEWSLETTER
        }
    ]
};

// eslint-disable-next-line import/prefer-default-export
export const COLUMN_MAP = [
    {
        title: 'About',
        items: [
            {
                href: '/about-us',
                title: 'About Us'
            }
        ]
    },
    {
        title: 'Additional info',
        items: [
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: 'Privacy Policy'
            },
            {
                href: '/terms-and-conditions',
                title: 'Terms of use'
            },
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: 'Use of Cookies'
            }
        ]
    },
    {
        title: 'Popular categories',
        items: [
            {
                href: '/women',
                title: 'Women'
            },
            {
                href: '/men',
                title: 'Men'
            },
            {
                href: '/accessories',
                title: 'Accessories'
            }
        ]
    },
    {
        title: 'Follow',
        isItemsHorizontal: true,
        items: [
            {
                href: 'https://www.linkedin.com/company/scandipwa',
                src: linkedinIcon,
                title: 'LinkedIn'
            },
            {
                href: 'https://www.facebook.com/ScandiPWA/',
                src: facebookIcon,
                title: 'Facebook'
            },
            {
                href: 'https://twitter.com/scandipwa',
                src: twitterIcon,
                title: 'Twitter'
            }
        ]
    },
    NEWSLETTER_COLUMN
];
