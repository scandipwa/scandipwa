import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePersistedQuery } from 'src/hooks/use-persisted-query';

import { ConfigQuery, StoreListData } from 'Query/Config.query';
import { useDeviceContext } from 'Store/Device';
import { useNotificationStore } from 'Store/Notification';
import { BrowserDatabase } from 'Util/BrowserDatabase';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { StoreSwitcherComponent, StoreSwitcherProps } from './StoreSwitcher.component';
import { STORE_CONFIG_KEY } from './StoreSwitcher.config';

/** @namespace Component/StoreSwitcher/Container/mapStateToProps */
export const storeSwitcherSelector = (state: RootState) => ({
    currentStoreCode: state.ConfigReducer.code as string
});

export type FormattedStoreList = Record<'id' | 'value' | 'storeUrl' | 'storeLinkUrl' | 'label', string>[]

export const formatStoreList = (
    storeList: StoreListData['storeList']
): FormattedStoreList => storeList
    .reduce<FormattedStoreList>(
        (acc, val) => {
            const {
                name,
                code,
                is_active,
                base_url,
                base_link_url
            } = val;

            if (!is_active) {
                return acc;
            }

            return [
                ...acc,
                {
                    id: `store_${ code }`,
                    value: code,
                    storeUrl: base_url,
                    storeLinkUrl: base_link_url,
                    label: name
                }
            ];
        }, []
    );

export const storeSwitcherLogic = (): StoreSwitcherProps => {
    const { isMobile } = useDeviceContext();
    const { currentStoreCode = 'default' } = useSelector(storeSwitcherSelector);
    const [isOpened, setIsOpened] = useState(false);
    const [storeLabel, setStoreLabel] = useState('');
    const [storeList, setStoreList] = useState<FormattedStoreList>([]);
    const { showNotification } = useNotificationStore();
    const showErrorNotification = (message: string) => showNotification('error', message);
    const { data, request } = usePersistedQuery<StoreListData>();

    const handleStoreSelect = (storeCode: string) => {
        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            showErrorNotification(__('This store can not be opened!'));

            return;
        }

        BrowserDatabase.deleteItem(STORE_CONFIG_KEY);
        window.location = store.storeLinkUrl as unknown as Location;
    };

    const onStoreSwitcherClick = () => {
        setIsOpened(!isOpened);
    };

    const onStoreSwitcherOutsideClick = () => {
        setIsOpened(false);
    };

    const setCurrentStoreLabel = (storeCode: string) => {
        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            return;
        }

        const { label } = store;

        setStoreLabel(label);
    };

    const getStoreList = async () => {
        await request(ConfigQuery.getStoreList());
    };

    useEffect(() => {
        getStoreList();
    }, []);

    useEffect(() => {
        if (currentStoreCode && !storeLabel) {
            setCurrentStoreLabel(currentStoreCode);
        }
    }, [currentStoreCode, storeList]);

    useEffect(() => {
        if (!data?.storeList) {
            return;
        }

        const { storeList } = data;

        setStoreList(formatStoreList(storeList));
    }, [data]);

    return {
        isOpened,
        storeLabel,
        handleStoreSelect,
        currentStoreCode,
        onStoreSwitcherClick,
        onStoreSwitcherOutsideClick,
        isMobile,
        storeList
    };
};

export const StoreSwitcher = renderHOC(StoreSwitcherComponent, storeSwitcherLogic, 'StoreSwitcherContainer');
