/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
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

import Link from 'Component/Link';
import { downloadableType } from 'Type/Account';

import './MyAccountDownloadableTableRow.style';

/** @namespace Component/MyAccountDownloadableTableRow/Component */
export class MyAccountDownloadableTableRowComponent extends PureComponent {
    static propTypes = {
        order: downloadableType.isRequired,
        onOrderIdClick: PropTypes.func.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired
    };

    renderOrderId() {
        const {
            order: {
                order_id
            },
            onOrderIdClick
        } = this.props;

        return (
            <div onClick={ onOrderIdClick } block="MyAccountDownloadTableRow" elem="OrderId">
                #
                { order_id }
            </div>
        );
    }

    renderTitle() {
        const {
            order: {
                download_url,
                link_title,
                title,
                downloads
            },
            isOpenInNewTab
        } = this.props;

        if (!download_url || !downloads) {
            return title;
        }

        return (
            <>
                { title }
                <Link
                  to={ download_url }
                  block="MyAccountDownloadTableRow"
                  elem="Link"
                  isOpenInNewTab={ isOpenInNewTab }
                >
                    { link_title }
                </Link>
            </>
        );
    }

    render() {
        const {
            order: {
                order_id,
                downloads,
                download_url,
                created_at,
                title,
                status_label = '',
                link_title
            } = {}
        } = this.props;

        return (
            <tr block="MyAccountOrderTableRow">
                <td>{ order_id ? `#${order_id}` : '' }</td>
                <td>{ created_at }</td>
                <td>
                    { title }
                    <a
                      href={ download_url }
                      download
                      block="MyAccountOrderTableRow"
                      elem="DownloadLink"
                    >
                        { link_title }
                    </a>
                </td>
                <td block="MyAccountDownloadTableRow" elem="Status">{ status_label }</td>
                <td>{ downloads }</td>
            </tr>
        );
    }
}

export default MyAccountDownloadableTableRowComponent;
