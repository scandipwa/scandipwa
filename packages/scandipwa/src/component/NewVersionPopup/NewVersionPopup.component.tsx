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

import Popup from 'Component/Popup';
import { ReactElement } from 'Type/Common.type';

import { NEW_VERSION_POPUP_ID } from './NewVersionPopup.config';
import { NewVersionPopupComponentProps } from './NewVersionPopup.type';

import './NewVersionPopup.style';

/** @namespace Component/NewVersionPopup/Component */
export class NewVersionPopup extends PureComponent<NewVersionPopupComponentProps> {
    renderHeading(): ReactElement {
        return (
            <h3
              block="NewVersionPopup"
              elem="Heading"
            >
                { __('New version available!') }
            </h3>
        );
    }

    renderNotice(): ReactElement {
        return (
            <p>
                { __('We have updated the website. Reload is required to apply changes.') }
            </p>
        );
    }

    renderReloadThePageButton(): ReactElement {
        const { toggleNewVersion } = this.props;

        return (
            <button
              block="NewVersionPopup"
              elem="ReloadButton"
              mix={ { block: 'Button' } }
              onClick={ toggleNewVersion }
            >
                { __('Reload the page') }
            </button>
        );
    }

    renderDismissButton(): ReactElement {
        const { handleDismiss } = this.props;

        return (
            <button
              block="Button"
              elem="isLikeLink"
              mix={ { block: 'NewVersionPopup', elem: 'DismissButton' } }
              onClick={ handleDismiss }
            >
                { __('Dismiss') }
            </button>
        );
    }

    renderButtons(): ReactElement {
        return (
            <div block="NewVersionPopup" elem="Buttons">
                { this.renderReloadThePageButton() }
                { this.renderDismissButton() }
            </div>
        );
    }

    renderContent(): ReactElement {
        return (
            <div block="NewVersionPopup" elem="Content">
                { this.renderHeading() }
                { this.renderNotice() }
                { this.renderButtons() }
            </div>
        );
    }

    render(): ReactElement {
        return (
            <Popup
              id={ NEW_VERSION_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'NewVersionPopup' } }
            >
                { this.renderContent() }
            </Popup>
        );
    }
}

export default NewVersionPopup;
