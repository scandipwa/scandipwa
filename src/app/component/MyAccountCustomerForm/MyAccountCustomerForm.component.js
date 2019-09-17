import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { customerType } from 'Type/Account';
import Field from 'Component/Field';
import Form from 'Component/Form';

import './MyAccountCustomerForm.style';

class MyAccountCustomerForm extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        onSave: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onSave } = this.props;
        onSave(fields);
    };

    get fieldMap() {
        return {
            email: {
                label: __('Email'),
                validation: ['notEmpty']
            },
            firstname: {
                label: __('First name'),
                validation: ['notEmpty']
            },
            lastname: {
                label: __('Last name'),
                validation: ['notEmpty']
            }
        };
    }

    renderCustomerField = ([key, props]) => {
        const { customer: { [key]: customerValue } } = this.props;
        const { label, type = 'text', validation } = props;

        return (
            <Field
              key={ key }
              name={ key }
              id={ key }
              type={ type }
              label={ label }
              value={ customerValue }
              validation={ validation }
            />
        );
    };

    renderFields() {
        return (
            <div
              block="MyAccountCustomerForm"
              elem="Fields"
            >
                { Object.entries(this.fieldMap).map(this.renderCustomerField) }
            </div>
        );
    }

    renderActions() {
        return (
            <button type="submit" block="Button">
                { __('Save customer') }
            </button>
        );
    }

    render() {
        return (
            <Form
              onSubmitSuccess={ this.onFormSuccess }
              mix={ { block: 'MyAccountCustomerForm' } }
            >
                { this.renderFields() }
                { this.renderActions() }
            </Form>
        );
    }
}

export default MyAccountCustomerForm;
