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

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import PasswordChangeForm from 'Component/PasswordChangeForm';

import './PasswordChangePage.style';

/** @namespace Route/PasswordChangePage/Component */
export class PasswordChangePage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPasswordSuccess: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        range: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }).isRequired,
        isMobile: PropTypes.bool.isRequired,
        shouldDisplayWarning: PropTypes.bool.isRequired,
        minimunPasswordCharacter: PropTypes.string.isRequired
    };

    renderWarningMessage() {
        const { shouldDisplayWarning } = this.props;

        if (!shouldDisplayWarning) {
            return null;
        }

        return (
            <div block="PasswordChangePage" elem="WarningMsg">
                <h2>
                    { __('Unable to reset password') }
                </h2>
                <div>
                    { __('The URL is invalid. Some parameters are missing.') }
                </div>
            </div>
        );
    }

    renderPageContents() {
        const {
            showNotification,
            range,
            onError,
            isMobile,
            onPasswordSuccess,
            shouldDisplayWarning,
            minimunPasswordCharacter
        } = this.props;

        if (shouldDisplayWarning) {
            return null;
        }

        return (
            <>
                { !isMobile && <h1>{ __('Change My Password') }</h1> }
                <PasswordChangeForm
                  onFormError={ onError }
                  onFormSubmit={ onPasswordSuccess }
                  showNotification={ showNotification }
                  range={ range }
                  minimunPasswordCharacter={ minimunPasswordCharacter }
                />
            </>
        );
    }

    renderContent() {
        const { isLoading } = this.props;

        return (
            <ContentWrapper
              mix={ { block: 'PasswordChangePage' } }
              wrapperMix={ { block: 'PasswordChangePage', elem: 'Wrapper' } }
              label={ __('Password Change Actions') }
            >
                <Loader isLoading={ isLoading } />
                { this.renderWarningMessage() }
                { this.renderPageContents() }
            </ContentWrapper>
        );
    }

    render() {
        return (
            <main block="PasswordChangePage" aria-label={ __('Password Change Page') }>
                { this.renderContent() }
            </main>
        );
    }
}

export default PasswordChangePage;
