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

import { downloadableType } from 'Type/Account';
import { DeviceType } from 'Type/Device';

import './MyAccountDownloadableTableRow.style';

/** @namespace Component/MyAccountDownloadableTableRow/Component */
export class MyAccountDownloadableTableRowComponent extends PureComponent {
    static propTypes = {
        order: downloadableType.isRequired,
        device: DeviceType.isRequired
    };

    render() {
        const {
            order: {
                order_id,
                downloads,
                download_url,
                created_at,
                title,
                status,
                link_title
            } = {},
            device: { isMobile } = {}
        } = this.props;

        const remainingDownloads = isMobile
            ? null
            : <td>{ downloads }</td>;

        return (
            <tr block="MyAccountOrderTableRow">
                <td>{ order_id }</td>
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
                <td>{ status }</td>
                { remainingDownloads }
            </tr>
        );
    }
}

export default MyAccountDownloadableTableRowComponent;
