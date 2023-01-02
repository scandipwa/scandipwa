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

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import {
    ProductConfigurableAttributeDropdownComponentProps,
    ProductConfigurableAttributeDropdownComponentState,
} from './ProductConfigurableAttributeDropdown.type';

import './ProductConfigurableAttributeDropdown.style';

/** @namespace Component/ProductConfigurableAttributeDropdown/Component */
export class ProductConfigurableAttributeDropdownComponent<
P extends Readonly<ProductConfigurableAttributeDropdownComponentProps> = Readonly<ProductConfigurableAttributeDropdownComponentProps>,
S extends ProductConfigurableAttributeDropdownComponentState = ProductConfigurableAttributeDropdownComponentState,
> extends PureComponent<
    P,
    S
    > {
    static defaultProps: Partial<ProductConfigurableAttributeDropdownComponentProps> = {
        selectValue: '',
        selectLabel: 'attribute',
        handleShakeAnimationEnd: noopFn,
        isUnselected: false,
    };

    render(): ReactElement {
        const {
            selectOptions,
            selectValue,
            selectName,
            selectLabel,
            onChange,
            handleShakeAnimationEnd,
            isUnselected,
        } = this.props;

        return (
            <Field
              type={ FieldType.SELECT }
              attr={ {
                  id: selectName,
                  name: selectName,
                  defaultValue: selectValue,
                  selectPlaceholder: __('Choose %s...', selectLabel.toLowerCase()),
                  onAnimationEnd: handleShakeAnimationEnd,
              } }
              events={ {
                  onChange,
              } }
              mix={ { block: 'ProductConfigurableAttributeDropdown', mods: { isUnselected } } }
              options={ selectOptions }
              changeValueOnDoubleClick
            />
        );
    }
}

export default ProductConfigurableAttributeDropdownComponent;
