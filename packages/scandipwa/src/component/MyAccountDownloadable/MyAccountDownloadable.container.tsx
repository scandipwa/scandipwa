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
import { Dispatch } from 'redux';

import OrderQuery from 'Query/Order.query';
import { CustomerDownloadableProduct } from 'Query/Order.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { fetchQuery, getErrorMessage } from 'Util/Request';

import MyAccountDownloadable from './MyAccountDownloadable.component';
import {
    CustomerDownloadableProductExtended,
    MyAccountDownloadableComponentProps,
    MyAccountDownloadableContainerDispatchProps,
    MyAccountDownloadableContainerProps,
    MyAccountDownloadableContainerState
} from './MyAccountDownloadable.type';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Component/MyAccountDownloadable/Container/mapStateToProps */
export const mapStateToProps = (): unknown => ({});

/** @namespace Component/MyAccountDownloadable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountDownloadableContainerDispatchProps => ({
    showErrorNotification: (message: string) => dispatch(showNotification(NotificationType.ERROR, message)),
    showSuccessNotification: (message: string) => dispatch(showNotification(NotificationType.SUCCESS, message))
});

/** @namespace Component/MyAccountDownloadable/Container */
export class MyAccountDownloadableContainer extends PureComponent<
MyAccountDownloadableContainerProps,
MyAccountDownloadableContainerState
> {
    state: MyAccountDownloadableContainerState = {
        items: [],
        isLoading: false
    };

    componentDidMount(): void {
        this.requestDownloadable();
    }

    containerProps(): MyAccountDownloadableComponentProps {
        const { isLoading } = this.state;

        return {
            isLoading,
            items: this._prepareDownloadableProps()
        };
    }

    _prepareDownloadableProps(): CustomerDownloadableProductExtended[] {
        const { items } = this.state;

        if (!items?.length) {
            return [];
        }

        return items.reduce((
            acc: CustomerDownloadableProductExtended[],
            item: CustomerDownloadableProduct,
            index: number
        ) => {
            acc.push({
                id: index,
                order_id: item.order_id,
                order_increment_id: item.order_increment_id,
                status_label: item.status,
                created_at: item.date,
                download_url: item.download_url,
                downloads: item.remaining_downloads,
                title: item.title,
                link_title: item.link_title
            });

            return acc;
        }, []);
    }

    async requestDownloadable(): Promise<void> {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const {
                customerDownloadableProducts: {
                    items = []
                } = {}
            } = await fetchQuery(OrderQuery.getDownloadableQuery());

            this.setState({ items, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e as Error));
            this.setState({ isLoading: false });
        }
    }

    render(): ReactElement {
        return (
            <MyAccountDownloadable
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDownloadableContainer);
