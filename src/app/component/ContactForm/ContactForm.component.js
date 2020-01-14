/* eslint-disable max-len */

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

import "./ContactForm.style";
import PropTypes from "prop-types";
import FieldForm from "Component/FieldForm";
import Loader from 'Component/Loader';

export default class ContactForm extends FieldForm {

    state = {
        formKey : 0
    };

    static propTypes = {
        sendMessage: PropTypes.func.isRequired,
        isLoading : PropTypes.bool
    };

    static defaultProps = {
        isLoading : false
    };

    componentDidUpdate(prevProps) {

        if (!prevProps.formSent && this.props.formSent) {
            this.clearForm();
        }
    }

    clearForm() {
        this.setState({
            formKey : this.state.formKey + 1
        });
    }

    onFormSuccess = fields => {
        const { sendMessage } = this.props;
        sendMessage(fields);
    };

    get fieldMap() {

        return {
            firstname: {
                label: __("First name"),
                validation: ["notEmpty"],
            },
            lastname: {
                label: __("Last name"),
                validation: ["notEmpty"],
            },
            telephone: {
                label: __("Phone number"),
                validation: ["notEmpty"],
            },
            email: {
                label: __("Email"),
                validation: ["notEmpty"],
            },
            message: {
                type: "textarea",
                label: __("Message"),
                validation: ["notEmpty"],
            },
        };
    }

    renderActions() {
        const { isLoading } = this.props;

        return (
            <>
                <Loader isLoading={isLoading} />
                <button type="submit" block="Button">
                    {__("Send message")}
                </button>
            </>
        );
    }
}
