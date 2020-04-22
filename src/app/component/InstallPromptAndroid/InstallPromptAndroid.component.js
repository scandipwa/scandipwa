
import PropTypes from 'prop-types';
import './InstallPromptAndroid.style';

class InstallPromptAndroid extends ExtensiblePureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired,
        handleAppInstall: PropTypes.func.isRequired
    };

    renderCloseButton() {
        const { handleBannerClose } = this.props;

        return (
            <button
              block="InstallPromptAndroid"
              elem="Close"
              onClick={ handleBannerClose }
            />
        );
    }

    renderContent() {
        return (
            <p block="InstallPromptAndroid" elem="Content">
                { __('Add website to your home screen for the full-screen browsing experience!') }
            </p>
        );
    }

    renderInstallButton() {
        const { handleAppInstall } = this.props;

        return (
            <button
              block="InstallPromptAndroid"
              elem="Button"
              mix={ { block: 'Button' } }
              onClick={ handleAppInstall }
            >
                { __('Add to home screen') }
            </button>
        );
    }

    render() {
        return (
            <div block="InstallPromptAndroid">
                { this.renderCloseButton() }
                { this.renderContent() }
                { this.renderInstallButton() }
            </div>
        );
    }
}

export default middleware(InstallPromptAndroid, 'Component/InstallPromptAndroid/Component');
