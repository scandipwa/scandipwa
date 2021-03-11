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
import { connect } from 'react-redux';

import { downloadableType } from 'Type/Account';
import { DeviceType } from 'Type/Device';

import MyAccountDownloadableTableRow from './MyAccountDownloadableTableRow.component';

/** @namespace Component/MyAccountDownloadableTableRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountDownloadableTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountDownloadableTableRow/Container */
export class MyAccountDownloadableTableRowContainer extends PureComponent {
    static propTypes = {
        order: downloadableType.isRequired,
        device: DeviceType.isRequired
    };

    containerProps() {
        const { device, order } = this.props;

        return ({
            order,
            device
        });
    }

    render() {
        return (
            <MyAccountDownloadableTableRow
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDownloadableTableRowContainer);
