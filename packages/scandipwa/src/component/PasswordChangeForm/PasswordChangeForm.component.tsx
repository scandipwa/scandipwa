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

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';

import customerEmailAndPasswordFields from './PasswordChangeForm.form';
import { PasswordChangeFormComponentProps } from './PasswordChangeForm.type';

import './PasswordChangeForm.style';

/** @namespace Component/PasswordChangeForm/Component */
<<<<<<< HEAD:packages/scandipwa/src/component/PasswordChangeForm/PasswordChangeForm.component.tsx
export class PasswordChangeForm extends FieldForm<PasswordChangeFormComponentProps> {
    fieldMap(): Partial<FieldContainerProps>[] {
        const { range, minimunPasswordCharacter } = this.props;
=======
export class PasswordChangeForm extends FieldForm {
    static propsTypes = {
        onFormSubmit: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        range: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired,
        minimunPasswordCharacter: PropTypes.string.isRequired
    };

    __construct(props) {
        super.__construct(props);
        this.passwordRef = React.createRef('');
    }

    get fieldMap() {
        const {
            range,
            minimunPasswordCharacter
        } = this.props;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/PasswordChangeForm/PasswordChangeForm.component.js

        return customerEmailAndPasswordFields(range, minimunPasswordCharacter, this.passwordRef);
    }

    getFormProps(): Partial<FormContainerProps> {
        const { onFormSubmit, onFormError } = this.props;

        return {
            onSubmit: onFormSubmit,
            onError: onFormError
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

export default PasswordChangeForm;
