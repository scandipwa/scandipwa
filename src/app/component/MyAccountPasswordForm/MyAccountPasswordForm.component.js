import PropTypes from 'prop-types';
import FieldForm from 'Component/FieldForm';

class MyAccountPasswordForm extends FieldForm {
    static propTypes = {
        onPasswordChange: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onPasswordChange } = this.props;
        onPasswordChange(fields);
    };

    get fieldMap() {
        return {
            currentPassword: {
                type: 'password',
                label: __('Current Password'),
                validation: ['notEmpty']
            },
            newPassword: {
                type: 'password',
                label: __('New Password'),
                validation: ['notEmpty']
            }
        };
    }

    renderActions() {
        return (
            <button block="Button">
                { __('Change password') }
            </button>
        );
    }
}

export default MyAccountPasswordForm;
