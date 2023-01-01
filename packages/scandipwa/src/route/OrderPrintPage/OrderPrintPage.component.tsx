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

import MyAccountOrderPrint from 'Component/MyAccountOrderPrint';
import { ReactElement } from 'Type/Common.type';

import { ORDER_PRINT_PAGE_BODY_CLS } from './OrderPrintPage.config';
import { OrderPrintPageComponentProps } from './OrderPrintPage.type';

import './OrderPrintPage.style';

/** @namespace Route/OrderPrintPage/Component */
export class OrderPrintPageComponent<
P extends Readonly<OrderPrintPageComponentProps> = Readonly<OrderPrintPageComponentProps>,
S extends OrderPrintPageComponentState = OrderPrintPageComponentState,
> extends PureComponent<P, S> {
    componentDidMount(): void {
        document.body.classList.add(ORDER_PRINT_PAGE_BODY_CLS);
    }

    componentWillUnmount(): void {
        document.body.classList.remove(ORDER_PRINT_PAGE_BODY_CLS);
    }

    render(): ReactElement {
        const { match, orderPrintRequest, orderPrintMap } = this.props;

        return (
            <div
              block="OrderPrintPage"
            >
                <MyAccountOrderPrint
                  match={ match }
                  orderPrintRequest={ orderPrintRequest }
                  orderPrintMap={ orderPrintMap }
                />
            </div>
        );
    }
}

export default OrderPrintPageComponent;
