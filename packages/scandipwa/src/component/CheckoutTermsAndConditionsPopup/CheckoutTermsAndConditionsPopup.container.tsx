/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import CheckoutTermsAndConditionsPopup from './CheckoutTermsAndConditionsPopup.component';
import {
    CheckoutTermsAndConditionsContainerPropsKeys,
    CheckoutTermsAndConditionsPopupComponentProps,
    CheckoutTermsAndConditionsPopupContainerMapDispatchProps,
    CheckoutTermsAndConditionsPopupContainerMapStateProps,
    CheckoutTermsAndConditionsPopupContainerProps,
    CheckoutTermsAndConditionsPopupPayload
} from './CheckoutTermsAndConditionsPopup.component.type';
import { TERMS_AND_CONDITIONS_POPUP_ID } from './CheckoutTermsAndConditionsPopup.config';

/** @namespace Component/CheckoutTermsAndConditionsPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutTermsAndConditionsPopupContainerMapStateProps => ({
    payload: (state.PopupReducer.popupPayload as {
        [TERMS_AND_CONDITIONS_POPUP_ID]: CheckoutTermsAndConditionsPopupPayload;
    })[
        TERMS_AND_CONDITIONS_POPUP_ID
    ]
});

/** @namespace Component/CheckoutTermsAndConditionsPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CheckoutTermsAndConditionsPopupContainerMapDispatchProps => ({});

/** @namespace Component/CheckoutTermsAndConditionsPopup/Container */
export class CheckoutTermsAndConditionsPopupContainer extends PureComponent<
CheckoutTermsAndConditionsPopupContainerProps
> {
    static defaultProps = {
        payload: {
            text: '',
            title: ''
        }
    };

    containerProps(): Pick<
    CheckoutTermsAndConditionsPopupComponentProps,
    CheckoutTermsAndConditionsContainerPropsKeys
    > {
        const { payload } = this.props;

        return { payload };
    }

    render(): ReactElement {
        return (
            <CheckoutTermsAndConditionsPopup
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutTermsAndConditionsPopupContainer);
