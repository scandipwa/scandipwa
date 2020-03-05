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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';

import './ProductGiftCardFields.style';

export default class ProductGiftCardFields extends PureComponent {
    static propTypes = {
        numberOfPlaceholders: PropTypes.array.isRequired,
        isReady: PropTypes.bool.isRequired,
        handleGiftCardSenderEmail: PropTypes.func.isRequired,
        handleGiftCardSenderName: PropTypes.func.isRequired,
        handleGiftCardRecipientEmail: PropTypes.func.isRequired,
        handleGiftCardRecipientName: PropTypes.func.isRequired,
        handleGiftCardMessage: PropTypes.func.isRequired,
        giftCardData: PropTypes.object.isRequired,
        allow_message: PropTypes.bool,
        message_max_length: PropTypes.number
    };

    static defaultProps = {
        allow_message: true,
        message_max_length: 255
    };

    renderPlaceholders() {
        const { numberOfPlaceholders } = this.props;

        return numberOfPlaceholders.map((length, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={ i }
              block="ProductGiftCardFields"
              elem="OptionsList"
            >
                { Array.from({ length }, (_, i) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={ i }
                      block="ProductGiftCardFields"
                      elem="Placeholder"
                    />
                )) }
            </div>
        ));
    }

    renderGiftCardFields() {
        const {
            giftCardData: {
                giftcard_sender_email,
                giftcard_message,
                giftcard_recipient_email,
                giftcard_recipient_name,
                giftcard_sender_name
            },
            handleGiftCardSenderEmail,
            handleGiftCardSenderName,
            handleGiftCardRecipientEmail,
            handleGiftCardRecipientName,
            handleGiftCardMessage,
            allow_message,
            message_max_length
        } = this.props;

        return (
            <>
                <Field
                  id="giftcard-sender-email"
                  name="giftcard-sender-email"
                  placeholder={ __('Sender Email') }
                  value={ giftcard_sender_email }
                  type="text"
                  onChange={ handleGiftCardSenderEmail }
                />
                <Field
                  id="giftcard-sender-name"
                  name="giftcard-sender-name"
                  placeholder={ __('Sender Name') }
                  value={ giftcard_sender_name }
                  type="text"
                  onChange={ handleGiftCardSenderName }
                />
                <Field
                  id="giftcard-receiver-email"
                  name="giftcard-receiver-email"
                  placeholder={ __('Recipient Email') }
                  value={ giftcard_recipient_email }
                  type="text"
                  onChange={ handleGiftCardRecipientEmail }
                />
                <Field
                  id="giftcard-receiver-name"
                  name="giftcard-receiver-name"
                  placeholder={ __('Recipient Name') }
                  value={ giftcard_recipient_name }
                  type="text"
                  onChange={ handleGiftCardRecipientName }
                />
                { allow_message && (
                    <Field
                      id="giftcard-message"
                      name="giftcard-message"
                      placeholder={ __('Message') }
                      value={ giftcard_message }
                      type="textarea"
                      onChange={ handleGiftCardMessage }
                      maxLength={ message_max_length }
                    />
                ) }
            </>
        );
    }

    render() {
        const { isReady } = this.props;

        return (
            <div block="ProductGiftCardFields">
                { isReady ? this.renderGiftCardFields() : this.renderPlaceholders() }
            </div>
        );
    }
}
