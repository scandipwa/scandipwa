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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Image from 'Component/Image';
import Link from 'Component/Link';
import media from 'Util/Media';
import isMobile from 'Util/Mobile';

export class MenuItem extends PureComponent {
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
            || ((!isMobile.any() && !isMobile.tablet()) && !isBanner && !isLogo)
            || (type === 'subcategory')
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
            item_id
        } = item;

        const isHovered = activeMenuItemsStack.includes(item_id);

        return (
            <Link
              to={ url }
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

export default MenuItem;
