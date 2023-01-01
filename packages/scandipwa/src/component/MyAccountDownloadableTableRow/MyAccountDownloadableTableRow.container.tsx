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
import { connect } from 'react-redux';

import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountDownloadableTableRow from './MyAccountDownloadableTableRow.component';
import {
    MyAccountDownloadableTableRowComponentProps,
    MyAccountDownloadableTableRowContainerFunctions,
    MyAccountDownloadableTableRowContainerMapStateProps,
    MyAccountDownloadableTableRowContainerProps,
} from './MyAccountDownloadableTableRow.type';

/** @namespace Component/MyAccountDownloadableTableRow/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountDownloadableTableRowContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window,
});

/** @namespace Component/MyAccountDownloadableTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (): unknown => ({});

/** @namespace Component/MyAccountDownloadableTableRow/Container */
export class MyAccountDownloadableTableRowContainer<
P extends Readonly<MyAccountDownloadableTableRowContainerProps> = Readonly<MyAccountDownloadableTableRowContainerProps>,
S extends MyAccountDownloadableTableRowContainerState = MyAccountDownloadableTableRowContainerState,
> extends PureComponent<P, S> {
    containerFunctions: MyAccountDownloadableTableRowContainerFunctions = {
        onOrderIdClick: this.onOrderIdClick.bind(this),
    };

    onOrderIdClick(): void {
        const { order: { order_id } } = this.props;

        history.push({ pathname: appendWithStoreCode(`${AccountPageUrl.ORDER_URL}/${order_id}`) });
    }

    containerProps(): Omit<MyAccountDownloadableTableRowComponentProps, 'onOrderIdClick'> {
        const { order, isOpenInNewTab } = this.props;

        return {
            order,
            isOpenInNewTab,
        };
    }

    render(): ReactElement {
        return (
            <MyAccountDownloadableTableRow
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDownloadableTableRowContainer);
