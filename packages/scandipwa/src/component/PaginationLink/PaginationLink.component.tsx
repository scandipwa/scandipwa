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

import Link from 'Component/Link';
import { ReactElement } from 'Type/Common.type';

import { PaginationLinkComponentProps } from './PaginationLink.type';

import './PaginationLink.style';

/** @namespace Component/PaginationLink/Component */
export class PaginationLink extends PureComponent<PaginationLinkComponentProps> {
    static defaultProps = {
        children: []
    };

    getSearchQueryForPage(): string {
        const { getSearchQueryForPage, pageNumber } = this.props;

        return getSearchQueryForPage(pageNumber);
    }

    render(): ReactElement {
        const {
            label,
            url_path: pathname,
            isCurrent,
            children
        } = this.props;

        const search = this.getSearchQueryForPage();

        const { state = {} } = history.state || {};

        return (
            <Link
              to={ {
                  search,
                  pathname,
                  state
              } }
              aria-label={ label }
              block="PaginationLink"
              mods={ { isCurrent, isArrow: typeof children !== 'string' } }
              aria-current={ isCurrent ? 'page' : 'false' }
            >
                { children }
            </Link>
        );
    }
}

export default PaginationLink;
