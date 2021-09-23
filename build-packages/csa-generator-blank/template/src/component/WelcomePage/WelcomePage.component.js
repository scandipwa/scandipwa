import { PureComponent } from 'react';

import logo from './logo.svg';

import './WelcomePage.style.scss';

/** @namespace Placeholder/Component/WelcomePage/Component/WelcomePageComponent */
export class WelcomePageComponent extends PureComponent {
    typeMap = {};

    renderLogo() {
        return (
            <img
              src={ logo }
              className="WelcomePage-Logo"
              alt="ScandiPWA logo"
            />
        );
    }

    renderWelcomeMessage() {
        return (
            <>
                <h2>{ __('This file source-code is located in:') }</h2>
                <p>
                    <code>src/component/WelcomePage/WelcomePage.component.js</code>
                </p>
                <p>
                    { __('Edit it and save to reload.') }
                </p>
                <a
                  className="WelcomePage-Link"
                  href="https://scandipwa.gitbook.io/create-scandipwa-app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    { __('Learn ScandiPWA') }
                </a>
            </>
        );
    }

    render() {
        return (
            <main className="WelcomePage">
                { this.renderLogo() }
                { this.renderWelcomeMessage() }
            </main>
        );
    }
}

export default WelcomePageComponent;
