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

// eslint-disable-next-line import/prefer-default-export
export const COLUMN_MAP = [
    {
        title: 'About',
        items: [
            {
                href: '/about-us',
                title: 'About Us'
            },
            {
                title: 'Contact Us'
            }
        ]
    },
    {
        title: 'Additional info',
        items: [
            {
                href: '/',
                title: 'Privacy Policy'
            },
            {
                href: '/',
                title: 'Terms of use'
            },
            {
                href: '/',
                title: 'Use of Cookies'
            }
        ]
    },
    {
        title: 'Popular categories',
        items: [
            {
                href: '/',
                title: 'Women'
            },
            {
                href: '/',
                title: 'Men'
            },
            {
                href: '/',
                title: 'Accessories'
            }
        ]
    },
    {
        title: 'Follow long',
        isItemsHorizontal: true,
        items: [
            {
                src: 'assets/images/linkedin.png'
            },
            {
                src: 'assets/images/facebook.png'
            },
            {
                src: 'assets/images/twitter.png'
            }
        ]
    }
];
