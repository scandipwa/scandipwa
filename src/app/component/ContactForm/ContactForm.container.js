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
import { connect } from 'react-redux';

import ContactForm from './ContactForm.component';

export const ContactFormDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ContactForm/ContactForm.dispatcher'
);

/** @namespace Component/ContactForm/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ContactForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    sendMessage: (data) => ContactFormDispatcher.then(
        ({ default: dispatcher }) => dispatcher.prepareRequest(data, dispatch)
    )
});

/** @namespace Component/ContactForm/Container */
export class ContactFormContainer extends PureComponent {
    static propTypes = {
        sendMessage: PropTypes.func.isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        onFormSubmit: this.onFormSubmit.bind(this)
    };

    onFormSubmit(fields) {
        const { sendMessage } = this.props;

        this.setState({ isLoading: true });

        sendMessage(fields)
            .then(
                /** @namespace Component/ContactForm/Container/sendMessageThen */
                () => this.setState({ isLoading: false })
            )
            .catch(
                /** @namespace Component/ContactForm/Container/sendMessageThenCatch */
                () => this.setState({ isLoading: false })
            );
    }

    render() {
        return (
            <ContactForm
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormContainer);
