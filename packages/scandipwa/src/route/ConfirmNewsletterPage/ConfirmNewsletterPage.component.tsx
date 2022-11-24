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

import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';

import { NewsletterConfirmStatus } from './ConfirmNewsletterPage.config';
import { ConfirmNewsletterPageComponentProps } from './ConfirmNewsletterPage.type';

import './ConfirmNewsletterPage.style';

/** @namespace Route/ConfirmNewsletterPage/Component */
export class ConfirmNewsletterPageComponent extends PureComponent<ConfirmNewsletterPageComponentProps> {
    renderWarningMessage() {
        const {
            status,
            message,
            shouldDisplayWarning,
        } = this.props;

        if (!shouldDisplayWarning && status !== NewsletterConfirmStatus.FAILED) {
            return null;
        }

        return (
            <div block="ConfirmNewsletterPage" elem="WarningMsg">
                <h2>
                    { __('Unable to confirm subscription.') }
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

        if (shouldDisplayWarning || status !== NewsletterConfirmStatus.SUCCESS) {
            return null;
        }

        return (
            <>
                <h1 block="ConfirmNewsletterPage" elem="Heading">
                    { __('Thank you for subscribing to our newsletter!') }
                </h1>
                <p block="ConfirmNewsletterPage" elem="Message">
                    { message }
                </p>
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

export default ConfirmNewsletterPageComponent;
