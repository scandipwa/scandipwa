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
import { Redirect } from 'react-router';

import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { ValidationInputType } from 'Util/Validator/Config';

import { ConfirmAccountPageComponentProps } from './ConfirmAccountPage.type';

import './ConfirmAccountPage.style';

/** @namespace Route/ConfirmAccountPage/Component */
export class ConfirmAccountPageComponent<
P extends Readonly<ConfirmAccountPageComponentProps> = Readonly<ConfirmAccountPageComponentProps>,
S extends ConfirmAccountPageComponentState = ConfirmAccountPageComponentState,
> extends PureComponent<P, S> {
    renderWarningMessage(): ReactElement {
        const { shouldDisplayWarning } = this.props;

        if (!shouldDisplayWarning) {
            return null;
        }

        return (
            <div block="ConfirmAccountPage" elem="WarningMsg">
                <h2>
                    { __('Unable to confirm account') }
                </h2>
                <div>
                    { __('The URL is invalid. Some parameters are missing.') }
                </div>
            </div>
        );
    }

    renderForm(): ReactElement {
        const {
            onConfirmSuccess,
            onFormError,
        } = this.props;

        return (
            <Form
              mix={ { block: 'ConfirmAccountPage', elem: 'Form' } }
              key="confirm-account"
              onSubmit={ onConfirmSuccess }
              onError={ onFormError }
            >
                { /*
                    Added email field with display:none to fix warning
                    `Password forms should have (optionally hidden) username fields for accessibility`
                */ }
                <Field
                  type={ FieldType.EMAIL }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email',
                  } }
                  mix={ { block: 'ConfirmAccountPage', elem: 'EmailInput' } }
                  addRequiredTag
                />
                <Field
                  type={ FieldType.PASSWORD }
                  label={ __('Password') }
                  attr={ {
                      id: 'password',
                      name: 'password',
                      placeholder: __('Enter your password'),
                      autoComplete: 'new-password',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: ValidationInputType.PASSWORD,
                  } }
                  addRequiredTag
                />
                <button
                  type="submit"
                  block="Button"
                  mix={ { block: 'ConfirmAccountPage', elem: 'Button' } }
                >
                    { __('Confirm your account') }
                </button>
            </Form>
        );
    }

    renderPageContents(): ReactElement {
        const { shouldDisplayWarning } = this.props;

        if (shouldDisplayWarning) {
            return null;
        }

        return (
            <>
                <h1 block="ConfirmAccountPage" elem="Heading">
                    { __('Confirm your account') }
                </h1>
                { this.renderForm() }
            </>
        );
    }

    render(): ReactElement {
        const {
            redirect,
            isLoading,
        } = this.props;

        if (redirect || isSignedIn()) {
            return <Redirect to={ AccountPageUrl.ACCOUNT_URL } />;
        }

        return (
            <main block="ConfirmAccountPage" aria-label={ __('Confirm Account Page') }>
                <ContentWrapper
                  wrapperMix={ { block: 'ConfirmAccountPage', elem: 'Wrapper' } }
                  label={ __('Confirm Account Action') }
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderWarningMessage() }
                    { this.renderPageContents() }
                </ContentWrapper>
            </main>
        );
    }
}

export default ConfirmAccountPageComponent;
