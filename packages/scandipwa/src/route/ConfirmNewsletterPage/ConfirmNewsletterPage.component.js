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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';

import { FAILED_STATUS, SUCCESS_STATUS } from './ConfirmNewsletterPage.config';

import './ConfirmNewsletterPage.style';

/** @namespace Route/ConfirmNewsletterPage/Component */
export class ConfirmNewsletterPage extends PureComponent {
    static propTypes = {
        status: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        shouldDisplayWarning: PropTypes.bool.isRequired
    };

    renderWarningMessage() {
        const { status, message, shouldDisplayWarning } = this.props;

        if (!shouldDisplayWarning && status !== FAILED_STATUS) {
            return null;
        }

        return (
            <div block="ConfirmNewsletterPage" elem="WarningMsg">
                <h2>
                    { __('Unable to confirm subscription') }
                </h2>
                <div>
                    { message }
                </div>
            </div>
        );
    }

    renderButtons() {
        return (
            <div block="ConfirmNewsletterPage" elem="ButtonWrapper">
                <Link
                  block="Button"
                  mix={ { block: 'ConfirmNewsletterPage', elem: 'ContinueButton' } }
                  to="/"
                >
                    { __('Continue shopping') }
                </Link>
            </div>
        );
    }

    renderPageContents() {
        const { status, message, shouldDisplayWarning } = this.props;

        if (shouldDisplayWarning || status !== SUCCESS_STATUS) {
            return null;
        }

        return (
            <>
                <h1 block="ConfirmNewsletterPage" elem="Heading">
                    { message }
                </h1>
                <h3 block="ConfirmNewsletterPage" elem="Message">
                    { __('Thank you for subscribing to our newsletter!') }
                </h3>
                { this.renderButtons() }
            </>
        );
    }

    render() {
        return (
            <main block="ConfirmNewsletterPage" aria-label={ __('Confirm Newsletter Page') }>
                <ContentWrapper
                  wrapperMix={ { block: 'ConfirmNewsletterPage', elem: 'Wrapper' } }
                >
                    { this.renderWarningMessage() }
                    { this.renderPageContents() }
                </ContentWrapper>
            </main>
        );
    }
}

export default ConfirmNewsletterPage;
