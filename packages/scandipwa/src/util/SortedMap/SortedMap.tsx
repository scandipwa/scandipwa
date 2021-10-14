/* eslint-disable @scandipwa/scandipwa-guidelines/only-one-class */
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

import { cloneElement, Fragment, isValidElement } from 'react';

export const DEFAULT_POSITION = 1000;

type SortedItem = () => JSX.Element

type SortedMapType = Map<string | SortedItem, { item: SortedItem; position: number; }>

/** @namespace Framework/Util/SortedMap/SortedMap */
export class SortedMap {
    public options: { renderItem?: (key: string | SortedItem, item: SortedItem) => JSX.Element } = {};

    private _unsortedMap!: SortedMapType;

    /**
     * Constructor. Used to convert the initial argument to Map.
     */
    constructor(
        object: { [key: string]: SortedItem },
        options: SortedMap['options']
    ) {
        this.options = options;

        this._unsortedMap = new Map(
            this._formatInitialData(object)
        );
    }

    /**
     * Sorts the Map by position property of each element
     */
    getSortedMap = (): SortedMapType => {
        const compareFunction = (
            [, a]: [string | SortedItem, {
                item: SortedItem;
                position: number;
            }],
            [, b]: [string | SortedItem, {
                item: SortedItem;
                position: number;
            }]
        ) => a.position - b.position;

        return new Map(
            // Sort the map by converting it array
            Array.from(this._unsortedMap.entries()).sort(compareFunction)
        );
    };

    /**
     * Adds new item to the unsorted map
     * @param item item to add
     * @param key unique key to be assigned to the map
     * @param position position in the list after sorting takes place
     */
    addItem = (item: SortedItem, key: string, position: number = this._getDefaultPosition()): void => {
        if (!key) {
            // eslint-disable-next-line max-len, no-console
            console.warn('An item in SortedMap does not have a key specified. Setting the key is advised and this warning could lead to an unexpected behaviour otherwise.');
        }

        if (!this._isKeyUnique(key)) {
            // eslint-disable-next-line max-len, no-console
            console.error(`An item in SortedMap has a duplicate key "${ key }". The original item with this was key removed as a result. If this is intended, you can supress this message by removing the item from the SortedMap first.`);
        }

        this._unsortedMap.set(key || item, { item, position });
    };

    /**
     * Retrieves an item from the unsorted map by key
     */
    getItemByKey = (key: string): { item: SortedItem, position: number } | undefined => this._unsortedMap.get(key);

    /**
     * Removes an item from the unsorted map by key
     */
    removeItemByKey = (key: string): boolean => this._unsortedMap.delete(key);

    /**
     * Calculates the default position based on the size of the map
     */
    _getDefaultPosition(): number {
        return (this._unsortedMap.size + 1) * DEFAULT_POSITION;
    }

    /**
     * Validates the uniqueness of the specified key within the Map
     */
    private _isKeyUnique(key: string) {
        return !this._unsortedMap.get(key);
    }

    /**
     * Applies formatting to the initial data, such as adding the "position" property
     */
    private _formatInitialData(object: { [key: string]: SortedItem }): Iterable<
        readonly [string | SortedItem, { item: SortedItem; position: number; }]
    > {
        return Object.entries(object).map(([key, item], i) => ([
            key,
            { item, position: (i + 1) * DEFAULT_POSITION }
        ]));
    }
}

/** @namespace Framework/Util/SortedMap/SortedRenderMap */
export class SortedRenderMap extends SortedMap {
    /**
     * Renders all items in the sorted Map.
     */
    render = (): JSX.Element[] => {
        const { renderItem = this._renderItem } = this.options;

        return Array.from(
            this.getSortedMap().entries(),
            ([key, { item }]) => renderItem(key, item)
        );
    };

    /**
     * Renders a single item from the Map.
     */
    private _renderItem(key: string | SortedItem, item: SortedItem): JSX.Element {
        const child = item();

        if (!isValidElement(child)) {
            return (
                <Fragment key={ key as string }>
                    { child }
                </Fragment>
            );
        }

        return cloneElement(child, { key: key as string });
    }
}

/** @namespace Framework/Util/SortedMap/createSortedMap */
export const createSortedMap = (
    object: { [key: string]: SortedItem } = {},
    options: SortedMap['options']
) => new SortedMap(object, options);
/** @namespace Framework/Util/SortedMap/createSortedRenderMap */
export const createSortedRenderMap = (
    object: { [key: string]: SortedItem } = {},
    options: SortedMap['options']
) => new SortedRenderMap(object, options);
