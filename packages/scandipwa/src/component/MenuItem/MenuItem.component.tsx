/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import AddIcon from 'Component/AddIcon';
import Link from 'Component/Link';
import MinusIcon from 'Component/MinusIcon';
import { Mods, ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { FormattedMenuItem } from 'Util/Menu/Menu.type';

import { MenuItemComponentProps } from './MenuItem.type';

/** @namespace Component/MenuItem/Component */
export class MenuItemComponent<
P extends Readonly<MenuItemComponentProps> = Readonly<MenuItemComponentProps>,
S extends MenuItemComponentState = MenuItemComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MenuItemComponentProps> = {
        onItemClick: noopFn,
    };

    renderPlusMinusIcon(): ReactElement {
        const { itemMods: { isExpanded } } = this.props;

        if (isExpanded) {
            return <MinusIcon />;
        }

        return <AddIcon />;
    }

    renderExpandButton(): ReactElement {
        const { isExpandable, itemMods } = this.props;

        if (!isExpandable) {
            return null;
        }

        return (
            <figcaption
              block="Menu"
              elem="ExpandedState"
              mods={ itemMods }
            >
                { this.renderPlusMinusIcon() }
            </figcaption>
        );
    }

    renderItemContent(item: FormattedMenuItem, itemMods: Mods): ReactElement {
        const { title } = item;

        return (
            <figcaption
              block="Menu"
              elem="ItemCaption"
              mods={ itemMods }
            >
                { title }
                { this.renderExpandButton() }
            </figcaption>
        );
    }

    renderItemLinkContent(): ReactElement {
        const {
            activeMenuItemsStack,
            item,
            itemMods,
            handleCategoryHover,
            handleLinkLeave,
            onItemClick,
        } = this.props;

        const {
            url,
            item_id,
        } = item;

        const isHovered = activeMenuItemsStack.includes(item_id);

        return (
            <Link
              to={ url }
              block="Menu"
              elem="Link"
              id={ item_id }
              onMouseEnter={ handleCategoryHover }
              onMouseLeave={ handleLinkLeave }
              mods={ { isHovered } }
              onClick={ onItemClick }
            >
                { this.renderItemContent(item, itemMods) }
            </Link>
        );
    }

    render(): ReactElement {
        const { item, itemMods, isLink } = this.props;

        if (isLink) {
            return this.renderItemLinkContent();
        }

        return this.renderItemContent(item, itemMods);
    }
}

export default MenuItemComponent;
