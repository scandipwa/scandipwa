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
import { DeviceType } from 'Type/Device';

import './MyAccountDownloadableTableRow.style';

/** @namespace Component/MyAccountDownloadableTableRow/Component */
export class MyAccountDownloadableTableRowComponent extends PureComponent {
    static propTypes = {
        order: downloadableType.isRequired,
        onOrderIdClick: PropTypes.func.isRequired,
        device: DeviceType.isRequired
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
            }
        } = this.props;

        if (!download_url || !downloads) {
            return title;
        }

        return (
            <>
                { title }
                <Link to={ download_url } block="MyAccountDownloadTableRow" elem="Link">
                    { link_title }
                </Link>
            </>
        );
    }

    render() {
        const {
            order: {
                downloads,
                created_at,
                status_label
            } = {},
            device: { isMobile } = {}
        } = this.props;

        const remainingDownloads = isMobile
            ? null
            : <td>{ downloads }</td>;

        return (
            <tr block="MyAccountDownloadTableRow">
                <td>{ this.renderOrderId() }</td>
                <td>{ created_at }</td>
                <td>{ this.renderTitle() }</td>
                <td block="MyAccountDownloadTableRow" elem="Status">{ status_label }</td>
                { remainingDownloads }
            </tr>
        );
    }
}

export default MyAccountDownloadableTableRowComponent;
