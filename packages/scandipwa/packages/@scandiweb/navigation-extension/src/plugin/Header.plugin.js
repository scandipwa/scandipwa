import ListIcon from 'Component/ListIcon';

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
import './HeaderOverride.style.scss';

export class HeaderPlugin {
    stateMap = (originalMember) => Object.entries(originalMember)
        .reduce((prev, [k, v]) => ({ ...prev, [k]: { ...v, menu: true, minicart: true } }), {});

    renderMap = (originalMember, instance) => ({
        menu: this.renderOpenMenuButton.bind(instance),
        ...originalMember,
        minicart: instance.renderMinicartButton.bind(instance)
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
