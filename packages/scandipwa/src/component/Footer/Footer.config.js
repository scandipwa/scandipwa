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

import facebookIcon from 'Style/icons/logos/facebook.svg';
import linkedinIcon from 'Style/icons/logos/linkedIn.svg';
import twitterIcon from 'Style/icons/logos/twitter.svg';

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
        title: __('About'),
        items: [
            {
                href: '/about-us',
                title: __('About Us')
            }
        ]
    },
    {
        title: __('Additional info'),
        items: [
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: __('Privacy Policy')
            },
            {
                href: '/terms-and-conditions',
                title: __('Terms of use')
            },
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: __('Use of Cookies')
            }
        ]
    },
    {
        title: __('Popular categories'),
        items: [
            {
                href: '/women',
                title: __('Women')
            },
            {
                href: '/men',
                title: __('Men')
            },
            {
                href: '/accessories',
                title: __('Accessories')
            }
        ]
    },
    {
        title: __('Follow'),
        isItemsHorizontal: true,
        items: [
            {
                href: 'https://www.linkedin.com/company/scandipwa',
                src: linkedinIcon,
                title: __('LinkedIn')
            },
            {
                href: 'https://www.facebook.com/ScandiPWA/',
                src: facebookIcon,
                title: __('Facebook')
            },
            {
                href: 'https://twitter.com/scandipwa',
                src: twitterIcon,
                title: __('Twitter')
            }
        ]
    },
    NEWSLETTER_COLUMN
];
