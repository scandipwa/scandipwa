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

import CompareIcon from 'Component/CompareIcon';
import Link from 'Component/Link/Link.container';

export class MenuPlugin {
    renderComparePageLink = (args, callback, instance) => {
        const { device, closeSideMenu } = instance.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <div
              block="Menu"
              elem="CompareLinkWrapper"
              onClick={ closeSideMenu }
              onKeyDown={ closeSideMenu }
              role="button"
              tabIndex="0"
            >
                <Link to="compare" block="Menu" elem="CompareLink">
                    <CompareIcon />
                    <h4>{ __('Compare products') }</h4>
                </Link>
            </div>
        );
    };
}

const { renderComparePageLink } = new MenuPlugin();

export default {
    'Component/Menu/Component': {
        'member-function': {
            renderComparePageLink
        }
    }
};
