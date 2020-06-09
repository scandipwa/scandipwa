/* eslint-disable jsx-a11y/click-events-have-key-events */
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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import media from 'Util/Media';
import Link from 'Component/Link';
import isMobile from 'Util/Mobile';
import Image from 'Component/Image';

export default class MenuItem extends PureComponent {
    static propTypes = {
        activeMenuItemsStack: PropTypes.array.isRequired,
        item: PropTypes.object.isRequired,
        itemMods: PropTypes.object,
        handleCategoryHover: PropTypes.func.isRequired,
        isLink: PropTypes.bool,
        closeMenu: PropTypes.func
    };

    static defaultProps = {
        itemMods: {},
        isLink: false,
        closeMenu: () => {}
    };

    renderItemContentImage(icon, itemMods) {
        const { isBanner, isLogo, type } = itemMods;

        if (!icon
            || (!isMobile.any() && !isBanner && !isLogo)
            || (isMobile && type === 'subcategory')
        ) {
            return null;
        }

        return (
            <Image
              mix={ { block: 'Menu', elem: 'Image', mods: itemMods } }
              src={ icon && media(icon) }
              ratio="custom"
            />
        );
    }

    renderItemContentTitle(isBanner, title) {
        if (isBanner) {
            return (
                <button
                  block="Menu"
                  elem="Button"
                  mix={ { block: 'Button' } }
                >
                    { title }
                </button>
            );
        }

        return title;
    }

    renderItemContent(item, itemMods = {}) {
        const { title, icon } = item;
        const { isBanner } = itemMods;

        return (
            <figure
              block="Menu"
              elem="ItemFigure"
              mods={ itemMods }
            >
                { this.renderItemContentImage(icon, itemMods) }
                <figcaption
                  block="Menu"
                  elem="ItemCaption"
                  mods={ itemMods }
                >
                    { this.renderItemContentTitle(isBanner, title) }
                </figcaption>
            </figure>
        );
    }

    renderItemLinkContent() {
        const {
            activeMenuItemsStack,
            item,
            itemMods,
            handleCategoryHover,
            closeMenu
        } = this.props;
        const {
            url,
            item_id,
            cms_page_identifier
        } = item;
        const isHovered = activeMenuItemsStack.includes(item_id);
        const path = cms_page_identifier ? `/${ cms_page_identifier}` : url;

        return (
            <Link
              to={ path }
              block="Menu"
              elem="Link"
              id={ item_id }
              onMouseEnter={ handleCategoryHover }
              mods={ { isHovered } }
              onClick={ closeMenu }
            >
                { this.renderItemContent(item, itemMods) }
            </Link>
        );
    }

    render() {
        const { item, itemMods, isLink } = this.props;

        if (isLink) {
            return this.renderItemLinkContent();
        }

        return this.renderItemContent(item, itemMods);
    }
}
