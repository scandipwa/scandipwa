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

import { FieldType } from 'Component/Field/Field.config';
import { CustomizableSelectionValue } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';
import { sortBySortOrder } from 'Util/Product';
import { IndexedCustomOptionValue } from 'Util/Product/Product.type';
import { customizableOptionsToSelectTransform, nonRequiredRadioOptions } from 'Util/Product/Transform';
import { RootState } from 'Util/Store/Store.type';

import ProductCustomizableOption from './ProductCustomizableOption.component';
import { ConfigFieldType } from './ProductCustomizableOption.config';
import {
    CustomFieldValue,
    ProductCustomizableOptionComponentContainerPropKeys,
    ProductCustomizableOptionComponentProps,
    ProductCustomizableOptionContainerFunctions,
    ProductCustomizableOptionContainerMapDispatchProps,
    ProductCustomizableOptionContainerMapStateProps,
    ProductCustomizableOptionContainerProps
} from './ProductCustomizableOption.type';

/** @namespace Component/ProductCustomizableOption/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductCustomizableOptionContainerMapStateProps => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code
});

/** @namespace Component/ProductCustomizableOption/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductCustomizableOptionContainerMapDispatchProps => ({});

/**
 * Product Customizable Option
 * @class ProductCustomizableOptionContainer
 * @namespace Component/ProductCustomizableOption/Container
 */
export class ProductCustomizableOptionContainer extends PureComponent<ProductCustomizableOptionContainerProps> {
    static defaultProps: Partial<ProductCustomizableOptionContainerProps> = {
        options: []
    };

    containerFunctions: ProductCustomizableOptionContainerFunctions = {
        getDropdownOptions: this.getDropdownOptions.bind(this),
        updateSelectedValues: this.updateSelectedValues.bind(this)
    };

    getFieldType(): FieldType {
        const { type } = this.props;
        const typeKey = Object.keys(ConfigFieldType).find(
            (key) => ConfigFieldType[ key as keyof typeof ConfigFieldType ] === type
        ) || '';

        return FieldType[ typeKey as keyof typeof FieldType ];
    }

    getDropdownOptions(): IndexedCustomOptionValue[] | null {
        const { options, currencyCode, type } = this.props;

        if (type !== ConfigFieldType.SELECT) {
            return null;
        }

        return sortBySortOrder(customizableOptionsToSelectTransform(
            options as CustomizableSelectionValue[],
            currencyCode
        )) as unknown as IndexedCustomOptionValue[];
    }

    getSortedOptions(): CustomFieldValue[] {
        const { options = [] as CustomFieldValue[] } = this.props;

        if (!Array.isArray(options)) {
            return options;
        }

        return sortBySortOrder(options);
    }

    updateSelectedValues(): void {
        const { updateSelectedValues } = this.props;

        updateSelectedValues();
    }

    containerProps(): Pick<
    ProductCustomizableOptionComponentProps,
    ProductCustomizableOptionComponentContainerPropKeys
    > {
        const {
            uid,
            title,
            isRequired,
            type,
            currencyCode
        } = this.props;

        return {
            uid,
            title,
            isRequired,
            type,
            options: nonRequiredRadioOptions(this.getSortedOptions(), isRequired, type),
            currencyCode,
            fieldType: this.getFieldType()
        };
    }

    render(): ReactElement {
        return (
            <ProductCustomizableOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizableOptionContainer);
