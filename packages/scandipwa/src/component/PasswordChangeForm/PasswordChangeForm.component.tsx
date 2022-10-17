/* eslint-disable spaced-comment */
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

import { MutableRefObject } from 'react';

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';

import customerEmailAndPasswordFields from './PasswordChangeForm.form';
import { PasswordChangeFormComponentProps } from './PasswordChangeForm.type';

import './PasswordChangeForm.style';

/** @namespace Component/PasswordChangeForm/Component */
export class PasswordChangeFormComponent extends FieldForm<PasswordChangeFormComponentProps> {
    passwordRef: MutableRefObject<
    HTMLInputElement
    > = React.createRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

    __construct(props: PasswordChangeFormComponentProps): void {
        super.__construct?.(props);
        this.passwordRef = React.createRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    }

    fieldMap(): Partial<FieldContainerProps>[] {
        const { range, minimunPasswordCharacter } = this.props;

        return customerEmailAndPasswordFields(range, minimunPasswordCharacter, this.passwordRef);
    }

    getFormProps(): Partial<FormContainerProps> {
        const { onFormSubmit, onFormError } = this.props;

        return {
            onSubmit: onFormSubmit,
            onError: onFormError,
        };
    }

    renderActions(): ReactElement {
        return (
            <div block="PasswordChangeForm" elem="Action">
                <button
                  type="submit"
                  block="PasswordChangeForm"
                  elem="Button"
                  mix={ { block: 'Button' } }
                >
                    { __('Update Password') }
                </button>
            </div>
        );
    }
}

export default PasswordChangeFormComponent;
