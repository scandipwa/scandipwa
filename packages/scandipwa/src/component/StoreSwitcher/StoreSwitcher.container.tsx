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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ConfigQuery from 'Query/Config.query';
import { StoreItem } from 'Query/Config.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import StoreSwitcher from './StoreSwitcher.component';
import { STORE_CONFIG_KEY } from './StoreSwitcher.config';
import {
    FormattedStore,
    StoreSwitcherComponentProps,
    StoreSwitcherContainerFunctions,
    StoreSwitcherContainerMapDispatchProps,
    StoreSwitcherContainerMapStateProps,
    StoreSwitcherContainerProps,
    StoreSwitcherContainerPropsKeys,
    StoreSwitcherContainerState
} from './StoreSwitcher.type';

/** @namespace Component/StoreSwitcher/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): StoreSwitcherContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    currentStoreCode: state.ConfigReducer.code
});

/** @namespace Component/StoreSwitcher/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StoreSwitcherContainerMapDispatchProps => ({
    showErrorNotification: (message) => dispatch(showNotification(NotificationType.ERROR, message))
});

/** @namespace Component/StoreSwitcher/Container */
export class StoreSwitcherContainer extends DataContainer<StoreSwitcherContainerProps, StoreSwitcherContainerState> {
    static defaultProps: Partial<StoreSwitcherContainerProps> = {
        currentStoreCode: 'default'
    };

    state: StoreSwitcherContainerState = {
        storeList: [],
        isOpened: false,
        storeLabel: ''
    };

    containerFunctions: StoreSwitcherContainerFunctions = {
        handleStoreSelect: this.handleStoreSelect.bind(this),
        onStoreSwitcherClick: this.onStoreSwitcherClick.bind(this),
        onStoreSwitcherOutsideClick: this.onStoreSwitcherOutsideClick.bind(this)
    };

    __construct(props: StoreSwitcherContainerProps): void {
        super.__construct(props, 'StoreSwitcherContainer');
    }

    componentDidMount(): void {
        this._getStoreList();
    }

    componentDidUpdate(prevProps: StoreSwitcherContainerProps): void {
        const { currentStoreCode } = this.props;
        const { prevStoreCode } = prevProps;
        const { storeLabel, storeList } = this.state;

        if (!storeList.length) {
            this._getStoreList();
        }

        if (currentStoreCode && (!storeLabel || (prevStoreCode !== currentStoreCode))) {
            this.getCurrentLabel(currentStoreCode);
        }
    }

    containerProps(): Pick<
    StoreSwitcherComponentProps,
    StoreSwitcherContainerPropsKeys
    > {
        const { currentStoreCode = '', device } = this.props;
        const { storeList, isOpened, storeLabel } = this.state;

        return {
            currentStoreCode,
            device,
            isOpened,
            storeLabel,
            storeList
        };
    }

    onStoreSwitcherClick(): void {
        const { isOpened } = this.state;

        this.setState({ isOpened: !isOpened });
    }

    onStoreSwitcherOutsideClick(): void {
        this.setState({ isOpened: false });
    }

    _getStoreList(): void {
        this.fetchData<{ storeList: StoreItem[] }>(
            [ConfigQuery.getStoreListField()],
            ({ storeList }) => this.setState({
                storeList: this._formatStoreList(storeList)
            })
        );
    }

    _formatStoreList(storeList: StoreItem[]): FormattedStore[] {
        return storeList.reduce((acc: FormattedStore[], {
            name,
            code,
            is_active,
            base_url,
            base_link_url
        }) => {
            if (!is_active) {
                return acc;
            }

            return [
                ...acc,
                {
                    id: `store_${code}`,
                    value: code,
                    storeUrl: base_url,
                    storeLinkUrl: base_link_url,
                    label: name
                }
            ];
        }, []);
    }

    getCurrentLabel(storeCode: string): void {
        const { storeList } = this.state;

        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            return;
        }

        const { label } = store;

        this.setState({ storeLabel: label });
    }

    handleStoreSelect(storeCode: string): void {
        const { showErrorNotification } = this.props;
        const { storeList } = this.state;

        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            showErrorNotification(__('This store can not be opened!'));

            return;
        }

        BrowserDatabase.deleteItem(STORE_CONFIG_KEY);
        window.location.href = store.storeLinkUrl;
    }

    render(): ReactElement {
        return (
            <StoreSwitcher
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSwitcherContainer);
