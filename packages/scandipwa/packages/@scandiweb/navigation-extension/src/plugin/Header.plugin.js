import ListIcon from 'Component/ListIcon';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';

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

export class HeaderPlugin {
    stateMap = (originalMember) => {
        const defaultState = { ...originalMember[DEFAULT_STATE_NAME], menu: true };
        return { ...originalMember, defaultState };
    };

    renderMap = (originalMember, instance) => ({
        ...originalMember,
        menu: this.renderOpenMenuButton.bind(instance)
    });

    renderOpenMenuButton() {
        const { openSideMenu } = this.props;

        return (
                <button
                  block="Header"
                  elem="OpenMenuBtn"
                  onClick={ openSideMenu }
                  aria-label={ __('Open Menu') }
                >
                    <ListIcon />
                </button>
        );
    }
}

const { renderMap, stateMap } = new HeaderPlugin();

export default {
    'Component/Header/Component': {
        'member-property': {
            renderMap,
            stateMap
        }
    }
};
