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
import { lazy } from 'react';

import ClickOutside from 'Component/ClickOutside';
import ListIcon from 'Component/ListIcon';

import './HeaderOverride.style.scss';

export const HamburgerMenu = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "navigation-extension" */
    '../component/HamburgerMenu'
));

export class HeaderPlugin {
    stateMap = (originalMember) => Object.entries(originalMember)
        .reduce((prev, [k, v]) => ({ ...prev, [k]: { ...v, menu: true, minicart: true } }), {});

    renderMap = (originalMember, instance) => ({
        menu: this.renderOpenMenuButton.bind(instance),
        ...originalMember,
        minicart: instance.renderMinicartButton.bind(instance)
    });

    renderOpenMenuButton() {
        const { openSideMenu, closeSideMenu } = this.props;

        return (
            <ClickOutside
              onClick={ closeSideMenu }
            >
                <div block="Header" elem="HamburgerMenuWrapper">
                    <button
                      block="Header"
                      elem="OpenMenuBtn"
                      onClick={ openSideMenu }
                      aria-label={ __('Open Menu') }
                    >
                        <ListIcon />
                    </button>
                    <HamburgerMenu />
                </div>
            </ClickOutside>
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
