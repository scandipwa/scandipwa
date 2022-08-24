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

import MyAccountOrderTableRow from './MyAccountOrderTableRow.component';
import {
    MyAccountOrderTableRowComponentProps,
    MyAccountOrderTableRowContainerFunctions,
    MyAccountOrderTableRowContainerMapDispatchProps,
    MyAccountOrderTableRowContainerMapStateProps,
    MyAccountOrderTableRowContainerProps,
    MyAccountOrderTableRowContainerPropsKeys
} from './MyAccountOrderTableRow.type';

/** @namespace Component/MyAccountOrderTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountOrderTableRowContainerMapDispatchProps => ({
});

/** @namespace Component/MyAccountOrderTableRow/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOrderTableRowContainerMapStateProps => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountOrderTableRow/Container */
export class MyAccountOrderTableRowContainer extends PureComponent<MyAccountOrderTableRowContainerProps> {
    containerFunctions: MyAccountOrderTableRowContainerFunctions = {
        onViewClick: this.onViewClick.bind(this)
    };

    onViewClick(): void {
        const { order } = this.props;

        if (!('id' in order)) {
            return;
        }

        const { id } = order;

        history.push({ pathname: appendWithStoreCode(`${AccountPageUrl.ORDER_URL}/${id}`) });
    }

    containerProps(): Pick<MyAccountOrderTableRowComponentProps, MyAccountOrderTableRowContainerPropsKeys> {
        const {
            order
        } = this.props;

        return {
            order
        };
    }

    render(): ReactElement {
        return (
            <MyAccountOrderTableRow
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer);
