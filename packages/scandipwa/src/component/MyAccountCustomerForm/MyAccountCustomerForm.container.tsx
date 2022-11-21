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

import { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    SHOW_VAT_NUMBER_OPTIONAL,
    SHOW_VAT_NUMBER_REQUIRED,
} from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountCustomerForm from './MyAccountCustomerForm.component';
import {
    MyAccountCustomerFormComponentProps,
    MyAccountCustomerFormContainerFunctions,
    MyAccountCustomerFormContainerMapDispatchProps,
    MyAccountCustomerFormContainerMapStateProps,
    MyAccountCustomerFormContainerProps,
    MyAccountCustomerFormContainerPropsKeys,
    MyAccountCustomerFormContainerState,
} from './MyAccountCustomerForm.type';

/** @namespace Component/MyAccountCustomerForm/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountCustomerFormContainerMapStateProps => ({
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number,
    minimunPasswordLength: state.ConfigReducer.minimun_password_length,
    minimunPasswordCharacter: state.ConfigReducer.required_character_classes_number,
    customer: state.MyAccountReducer.customer,
});

/** @namespace Component/MyAccountCustomerForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountCustomerFormContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountCustomerForm/Container */
export class MyAccountCustomerFormContainer extends PureComponent<
MyAccountCustomerFormContainerProps,
MyAccountCustomerFormContainerState
> {
    containerFunctions: MyAccountCustomerFormContainerFunctions = {
        handleEmailInput: this.handleEmailInput.bind(this),
        handlePasswordInput: this.handlePasswordInput.bind(this),
    };

    state: MyAccountCustomerFormContainerState = {
        email: '',
        currentPassword: '',
        isEmailEdit: false,
    };

    containerProps(): Pick<
    MyAccountCustomerFormComponentProps,
    MyAccountCustomerFormContainerPropsKeys
    > {
        const {
            customer: { email: currentCustomerEmail },
            customer,
            onSave,
            showEmailChangeField,
            showPasswordChangeField,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            minimunPasswordLength,
            minimunPasswordCharacter,
        } = this.props;
        const {
            email,
            currentPassword,
            isEmailEdit,
        } = this.state;

        const range = { min: minimunPasswordLength, max: 64 };

        return {
            customer,
            onSave,
            showTaxVatNumber: this.getIsShowVatNumber(),
            vatNumberRequired: this.getVatNumberRequired(),
            showEmailChangeField,
            showPasswordChangeField,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            currentPassword,
            range,
            minimunPasswordCharacter,
            email: !isEmailEdit ? currentCustomerEmail as string : email,
        };
    }

    getIsShowVatNumber(): boolean {
        const { showTaxVatNumber } = this.props;

        return showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED
            || showTaxVatNumber === SHOW_VAT_NUMBER_OPTIONAL;
    }

    getVatNumberRequired(): boolean {
        const { showTaxVatNumber } = this.props;

        return showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED;
    }

    handleEmailInput(emailInput: ChangeEvent<HTMLInputElement>): void {
        this.setState({ email: emailInput.target.value, isEmailEdit: true });
    }

    handlePasswordInput(currentPasswordInput: ChangeEvent<HTMLInputElement>): void {
        this.setState({ currentPassword: currentPasswordInput.target.value });
    }

    render(): ReactElement {
        return (
            <MyAccountCustomerForm
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCustomerFormContainer);
