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
import { STATUS_EXPIRED } from 'Component/MyAccountDownloadableTableRow/MyAccountDownloadableTableRow.config';
import { DownloadableType } from 'Type/Order.type';

import './MyAccountDownloadableTableRow.style';

/** @namespace Component/MyAccountDownloadableTableRow/Component */
export class MyAccountDownloadableTableRowComponent extends PureComponent {
    static propTypes = {
        order: DownloadableType.isRequired,
        onOrderIdClick: PropTypes.func.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired
    };

    renderOrderIncrementId() {
        const {
            order: {
                order_increment_id
            },
            onOrderIdClick
        } = this.props;

        return (
            <div onClick={ onOrderIdClick } block="MyAccountDownloadTableRow" elem="OrderId">
                #
                { order_increment_id }
            </div>
        );
    }

    renderLink() {
        const {
            order: {
                download_url,
                link_title,
                downloads,
                status_label
            },
            isOpenInNewTab
        } = this.props;

        if (!download_url || !downloads || status_label === STATUS_EXPIRED) {
            return null;
        }

        return (
            <Link
              to={ download_url }
              block="MyAccountDownloadTableRow"
              elem="DownloadLink"
              isOpenInNewTab={ isOpenInNewTab }
            >
                { link_title }
            </Link>
        );
    }

    render() {
        const {
            order: {
                order_increment_id,
                downloads,
                created_at,
                title,
                status_label = ''
            } = {}
        } = this.props;

        return (
            <tr block="MyAccountOrderTableRow">
                <td>{ order_increment_id ? this.renderOrderIncrementId() : '' }</td>
                <td>{ created_at }</td>
                <td>
                    { title }
                    { this.renderLink() }
                </td>
                <td block="MyAccountDownloadTableRow" elem="Status">{ status_label }</td>
                <td>{ downloads }</td>
            </tr>
        );
    }
}

export default MyAccountDownloadableTableRowComponent;
