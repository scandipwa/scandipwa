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

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';

import myAccountPasswordForm from './MyAccountPasswordForm.form';
import { MyAccountPasswordFormComponentProps } from './MyAccountPasswordForm.type';

/** @namespace Component/MyAccountPasswordForm/Component */
export class MyAccountPasswordForm extends FieldForm<MyAccountPasswordFormComponentProps> {
    onFormSuccess(form: HTMLFormElement, fields: FieldData[]): void {
        const { onPasswordChange } = this.props;
        onPasswordChange(transformToNameValuePair(fields));
    }

    get fieldMap(): Partial<FieldContainerProps>[] {
        const { range, minimunPasswordCharacter } = this.props;

        return myAccountPasswordForm(range, minimunPasswordCharacter);
    }

    getFormProps(): Partial<FormContainerProps> {
        return {
            onSubmit: this.onFormSuccess.bind(this)
        };
    }

    renderActions(): ReactElement {
        return (
            <button block="Button" mix={ { block: 'MyAccount', elem: 'Button' } }>
                { __('Change password') }
            </button>
        );
    }
}

export default MyAccountPasswordForm;
