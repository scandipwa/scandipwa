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

import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { sortBySortOrder } from 'Util/Product';
import { IndexedBundleOption, TransformedBundleOption } from 'Util/Product/Product.type';
import {
    bundleOptionsToSelectTransform,
    getEncodedBundleUid,
    nonRequiredRadioOptions,
} from 'Util/Product/Transform';
import { RootState } from 'Util/Store/Store.type';

import ProductBundleOption from './ProductBundleOption.component';
import { DEFAULT_SORT_FIELD } from './ProductBundleOption.config';
import {
    ProductBundleOptionComponentContainerPropKeys,
    ProductBundleOptionComponentProps,
    ProductBundleOptionContainerFunctions,
    ProductBundleOptionContainerMapDispatchProps,
    ProductBundleOptionContainerMapStateProps,
    ProductBundleOptionContainerProps,
    ProductBundleOptionContainerState,
} from './ProductBundleOption.type';

/** @namespace Component/ProductBundleOption/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductBundleOptionContainerMapStateProps => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code,
});

/** @namespace Component/ProductBundleOption/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductBundleOptionContainerMapDispatchProps => ({});

/**
 * Product Bundle Option
 * @class ProductBundleOptionContainer
 * @namespace Component/ProductBundleOption/Container
 */
export class ProductBundleOptionContainer extends PureComponent<
ProductBundleOptionContainerProps,
ProductBundleOptionContainerState
> {
    state: ProductBundleOptionContainerState = {
        // Is different from UID, due to quantity changing encoding
        activeSelectUid: null,
        quantity: {},
    };

    containerFunctions: ProductBundleOptionContainerFunctions = {
        setQuantity: this.setQuantity.bind(this),
        setActiveSelectUid: this.setActiveSelectUid.bind(this),
        getUidWithQuantity: this.getUidWithQuantity.bind(this),
        getDropdownOptions: this.getDropdownOptions.bind(this),
        setDefaultOption: this.setDefaultOption.bind(this),
    };

    componentDidMount(): void {
        this.setDefaultOption();
    }

    componentDidUpdate(
        prevProps: ProductBundleOptionContainerProps,
        prevState: ProductBundleOptionContainerState,
    ): void {
        const { quantity } = this.state;
        const { quantity: prevQuantity } = prevState;

        if (quantity !== prevQuantity) {
            const { updateSelectedValues } = this.props;

            updateSelectedValues();
        }
    }

    getUidWithQuantity(uid: string, defaultQuantity = 1): string {
        const { quantity: { [ uid ]: quantity = defaultQuantity } } = this.state;

        return getEncodedBundleUid(uid, quantity);
    }

    setQuantity(uid: string, value: number): void {
        const { quantity } = this.state;
        const rangedValue = value < 1 ? 1 : value;

        this.setState({
            quantity: {
                ...quantity,
                [ uid ]: rangedValue,
            },
        });
    }

    setActiveSelectUid(uid: string): void {
        this.setState({
            activeSelectUid: uid,
        });
    }

    setDefaultOption(): void {
        const { options } = this.props;

        const [defaultOption = null] = bundleOptionsToSelectTransform(options).filter(({ isDefault }) => isDefault);
        const { isAvailable = false } = defaultOption || {};

        if (defaultOption && isAvailable) {
            this.setActiveSelectUid(defaultOption.value);
        }
    }

    getDropdownOptions(): TransformedBundleOption[] {
        const { options, currencyCode } = this.props;
        const { quantity } = this.state;

        return sortBySortOrder(bundleOptionsToSelectTransform(options, currencyCode as GQLCurrencyEnum, quantity));
    }

    getSortedOptions(): IndexedBundleOption[] {
        const { options = {} as IndexedBundleOption[] } = this.props;

        if (!Array.isArray(options)) {
            return options;
        }

        return sortBySortOrder(options, DEFAULT_SORT_FIELD);
    }

    containerProps(): Pick<ProductBundleOptionComponentProps, ProductBundleOptionComponentContainerPropKeys> {
        const {
            uid,
            title,
            isRequired,
            type,
            updateSelectedValues,
            currencyCode,
        } = this.props;

        const {
            activeSelectUid,
            quantity,
        } = this.state;

        return {
            uid,
            title,
            isRequired,
            type,
            options: nonRequiredRadioOptions(
                this.getSortedOptions(),
                isRequired,
                type,
            ) as Partial<IndexedBundleOption>[],
            updateSelectedValues,
            currencyCode: currencyCode as GQLCurrencyEnum,
            activeSelectUid,
            quantity,
        };
    }

    render(): ReactElement {
        return (
            <ProductBundleOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductBundleOptionContainer);
