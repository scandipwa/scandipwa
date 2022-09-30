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

import Html from 'Component/Html';
import Popup from 'Component/Popup';
import { ReactElement } from 'Type/Common.type';

import { CheckoutTermsAndConditionsPopupComponentProps } from './CheckoutTermsAndConditionsPopup.component.type';
import { TERMS_AND_CONDITIONS_POPUP_ID } from './CheckoutTermsAndConditionsPopup.config';

import './CheckoutTermsAndConditionsPopup.style';

/** @namespace Component/CheckoutTermsAndConditionsPopup/Component */
export class CheckoutTermsAndConditionsPopupComponent extends PureComponent<CheckoutTermsAndConditionsPopupComponentProps> {
    renderContent(): ReactElement {
        const { payload: { text = 'No text was passed' } } = this.props;

        return (
            <Html content={ text } />
        );
    }

    render(): ReactElement {
        return (
            <Popup
              id={ TERMS_AND_CONDITIONS_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'CheckoutTermsAndConditionsPopup' } }
            >
                { this.renderContent() }
            </Popup>
        );
    }
}

export default CheckoutTermsAndConditionsPopupComponent;
