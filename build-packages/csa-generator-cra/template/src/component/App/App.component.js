import { PureComponent } from 'react';

import logo from './logo.svg';

import './App.style.scss';

/** @namespace Placeholder/Component/App/Component/AppComponent */
export class AppComponent extends PureComponent {
    renderLogo() {
        return (
            <img
              src={ logo }
              className="App-Logo"
              alt="ScandiPWA logo"
            />
        );
    }

    renderWelcomeMessage() {
        return (
            <>
                <h2>This file source-code is located in:</h2>
                <p><code>src/component/App/App.component.js</code></p>
                <p>Edit it and save to reload.</p>
                <a
                  className="App-Link"
                  href="https://docs.create-scandipwa-app.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    Learn ScandiPWA
                </a>
            </>
        );
    }

    render() {
        return (
            <main className="App">
                { this.renderLogo() }
                { this.renderWelcomeMessage() }
            </main>
        );
    }
}

export default AppComponent;
