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

import ChevronIcon from 'Component/ChevronIcon';
import Link from 'Component/Link';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ReactElement, Url } from 'Type/Common.type';

import { BreadcrumbComponentProps } from './Breadcrumb.type';

import './Breadcrumb.style';

/** @namespace Component/Breadcrumb/Component */
export class BreadcrumbComponent extends PureComponent<BreadcrumbComponentProps> {
    static defaultProps: Partial<BreadcrumbComponentProps> = {
        url: '',
        name: '',
    };

    getLinkUrl(): Url {
        const {
            url = '',
        } = this.props;

        if (typeof url === 'string' || !url) {
            return {
                pathname: url || '',
                search: '',
            };
        }

        return url;
    }

    renderLink(): ReactElement {
        const {
            index,
            isDisabled,
            name,
        } = this.props;

        const url = this.getLinkUrl();
        const nameToString = String(name);

        return (
            <Link
              block="Breadcrumb"
              elem="Link"
              to={ url }
              tabIndex={ isDisabled ? -1 : 0 }
            >
                <meta
                  itemProp="item"
                  content={ window.location.origin + url.pathname }
                />
                <span block="Breadcrumb" elem="Link-Name" itemProp="name">
                    <TextPlaceholder content={ nameToString } />
                </span>
                <ChevronIcon />
                <meta itemProp="position" content={ String(index) } />
            </Link>
        );
    }

    render(): ReactElement {
        const { index } = this.props;

        return (
            <li
              block="Breadcrumb"
              key={ index }
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
                { this.renderLink() }
            </li>
        );
    }
}

export default BreadcrumbComponent;
