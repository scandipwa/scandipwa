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
import Loader from 'Component/Loader';
import PasswordChangeForm from 'Component/PasswordChangeForm';
import { ReactElement } from 'Type/Common.type';

import { PasswordChangePageComponentProps } from './PasswordChangePage.type';

import './PasswordChangePage.style';

/** @namespace Route/PasswordChangePage/Component */
export class PasswordChangePageComponent<
P extends Readonly<PasswordChangePageComponentProps> = Readonly<PasswordChangePageComponentProps>,
S extends PasswordChangePageComponentState = PasswordChangePageComponentState,
> extends PureComponent<P, S> {
    renderWarningMessage(): ReactElement {
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

    renderPageContents(): ReactElement {
        const {
            range,
            onError,
            isMobile,
            onPasswordSuccess,
            shouldDisplayWarning,
            minimunPasswordCharacter,
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
                  range={ range }
                  minimunPasswordCharacter={ minimunPasswordCharacter }
                />
            </>
        );
    }

    renderContent(): ReactElement {
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

    render(): ReactElement {
        return (
            <main block="PasswordChangePage" aria-label={ __('Password Change Page') }>
                { this.renderContent() }
            </main>
        );
    }
}

export default PasswordChangePageComponent;
