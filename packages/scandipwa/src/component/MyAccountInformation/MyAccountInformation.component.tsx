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

import Loader from 'Component/Loader';
import MyAccountCustomerForm from 'Component/MyAccountCustomerForm';
import { ReactElement } from 'Type/Common.type';

import { MyAccountInformationComponentProps } from './MyAccountInformation.type';

import './MyAccountInformation.style';

/** @namespace Component/MyAccountInformation/Component */
export class MyAccountInformationComponent extends PureComponent<MyAccountInformationComponentProps> {
    renderCustomerForm(): ReactElement {
        const {
            onCustomerSave,
            showEmailChangeField,
            showPasswordChangeField,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
        } = this.props;

        return (
            <MyAccountCustomerForm
              onSave={ onCustomerSave }
              showEmailChangeField={ showEmailChangeField }
              showPasswordChangeField={ showPasswordChangeField }
              handleChangeEmailCheckbox={ handleChangeEmailCheckbox }
              handleChangePasswordCheckbox={ handleChangePasswordCheckbox }
            />
        );
    }

    render(): ReactElement {
        const { isLoading } = this.props;

        return (
            <div
              block="MyAccountInformation"
              elem="Wrapper"
            >
                <Loader isLoading={ isLoading } />
                { this.renderCustomerForm() }
            </div>
        );
    }
}

export default MyAccountInformationComponent;
