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

import './NewVersionPopup.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Popup from 'Component/Popup';

import { NEW_VERSION_POPUP_ID } from './NewVersionPopup.config';

export class NewVersionPopup extends PureComponent {
    static propTypes = {
        toggleNewVersion: PropTypes.func.isRequired
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

    renderButton() {
        const { toggleNewVersion } = this.props;

        return (
            <button
              block="NewVersionPopup"
              elem="Button"
              mix={ { block: 'Button' } }
              onClick={ toggleNewVersion }
            >
                { __('Reload the page') }
            </button>
        );
    }

    renderContent() {
        return (
            <div block="NewVersionPopup" elem="Content">
                { this.renderHeading() }
                { this.renderNotice() }
                { this.renderButton() }
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
