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

import {PureComponent} from "react";
import {connect} from "react-redux";
import ContactForm from "./ContactForm.component";
import {sendMessage} from "Store/ContactForm";
import {ContactFormDispatcher} from 'Store/ContactForm';

export const mapStateToProps = state => ({
    isLoading : state.ContactFormReducer.isLoading,
    formSent : state.ContactFormReducer.formSent,
});

export const mapDispatchToProps = dispatch => ({
    sendMessage: data => ContactFormDispatcher.prepareRequest(data, dispatch)
});

class ContactFormContainer extends PureComponent {
    render() {
        return (
            <ContactForm
                {...this.props}
                {...this.containerFunctions}
            />
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactFormContainer);
