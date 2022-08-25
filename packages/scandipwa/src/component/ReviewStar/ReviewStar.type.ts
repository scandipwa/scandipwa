/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface ReviewStarComponentProps {
    value: string;
    name: string;
    title: string;
    isChecked: boolean;
    option_id: string;
    rating_id: string;
    onStarRatingClick: (rating_id: string, option_id: string) => void;
}
