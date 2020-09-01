import './InstallPromptIOS.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export class InstallPromptIOS extends PureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired
    };

    renderCloseButton() {
        const { handleBannerClose } = this.props;

        return (
            <button
              block="InstallPromptIOS"
              elem="Close"
              onClick={ handleBannerClose }
            >
                { __('Maybe later') }
            </button>
        );
    }

    renderContent() {
        return (
            <p block="InstallPromptIOS" elem="Content">
                <span>{ __('Tap:') }</span>
                <span block="InstallPromptIOS" elem="Share" />
                <span>{ __(', then') }</span>
                <span block="InstallPromptIOS" elem="Plus" />
                <span>{ __('Add to Home Screen') }</span>
            </p>
        );
    }

    renderHeading() {
        return (
            <p block="InstallPromptIOS" elem="Heading">
                { __('Browse website in full-screen:') }
            </p>
        );
    }

    render() {
        return (
            <div block="InstallPromptIOS">
                { this.renderHeading() }
                { this.renderContent() }
                { this.renderCloseButton() }
            </div>
        );
    }
}

export default InstallPromptIOS;
