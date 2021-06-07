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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import Form from 'Component/Form';

import './FieldForm.style';

/** @namespace Component/FieldForm/Component */
export class FieldForm extends PureComponent {
    static propTypes = {
        isSubmitted: PropTypes.bool
    };

    static defaultProps = {
        isSubmitted: false
    };

    onFormSuccess() {
        // TODO: implement
    }

    get fieldMap() {
        return {
            // email: {
            //     label: __('Email'),
            //     validation: ['notEmpty']
            // }
        };
    }

    getDefaultValues([key, props]) {
        const {
            type = 'text',
            onChange = () => {},
            ...otherProps
        } = props;

        return {
            ...otherProps,
            key,
            name: key,
            id: key,
            type,
            onChange
        };
    }

    renderField = (fieldEntry) => (
        <Field { ...this.getDefaultValues(fieldEntry) } />
    );

    renderFields() {
        return (
            <div
              block="FieldForm"
              elem="Fields"
            >
                { Object.entries(this.fieldMap).map(this.renderField) }
            </div>
        );
    }

    renderActions() {
        return null;
    }

    render() {
        return (
            <Form
              onSubmitSuccess={ this.onFormSuccess }
              mix={ { block: 'FieldForm' } }
            >
                { this.renderFields() }
                { this.renderActions() }
            </Form>
        );
    }
}

export default FieldForm;
