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

import Popup from 'Component/Popup';

import { NEW_VERSION_POPUP_ID } from './NewVersionPopup.config';

import './NewVersionPopup.style';

/** @namespace Component/NewVersionPopup/Component */
export class NewVersionPopup extends PureComponent {
    static propTypes = {
        toggleNewVersion: PropTypes.func.isRequired,
        handleDismiss: PropTypes.func.isRequired
    };

    renderHeading() {
        return (
            <h3
              block="NewVersionPopup"
              elem="Heading"
            >
                { __('New version available!') }
            </h3>
        );
    }

    renderNotice() {
        return (
            <p>
                { __('We have updated the website. Reload is required to apply changes.') }
            </p>
        );
    }

    renderReloadThePageButton() {
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

    renderDismissButton() {
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

    renderButtons() {
        return (
            <div block="NewVersionPopup" elem="Buttons">
                { this.renderReloadThePageButton() }
                { this.renderDismissButton() }
            </div>
        );
    }

    renderContent() {
        return (
            <div block="NewVersionPopup" elem="Content">
                { this.renderHeading() }
                { this.renderNotice() }
                { this.renderButtons() }
            </div>
        );
    }

    render() {
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
