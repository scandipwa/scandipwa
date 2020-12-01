import { PureComponent } from 'react';

import App from './App.component';

/** @namespace Framework/Component/App/Container/AppContainer */
export class AppContainer extends PureComponent {
    productionFunctions = [
        this.disableReactDevTools.bind(this),
        this.injectComment.bind(this)
    ];

    developmentFunctions = [];

    state = {
        isSomethingWentWrong: false,
        errorDetails: {}
    };

    containerFunctions = {
        handleErrorReset: this.handleErrorReset.bind(this)
    };

    componentDidCatch(err, info) {
        this.setState({
            isSomethingWentWrong: true,
            errorDetails: { err, info }
        });
    }

    handleErrorReset() {
        this.setState({ isSomethingWentWrong: false });
    }

    containerProps = () => {
        const {
            isSomethingWentWrong,
            errorDetails
        } = this.state;

        return {
            isSomethingWentWrong,
            errorDetails
        };
    };

    __construct(props) {
        super.__construct(props);

        this.configureAppBasedOnEnvironment();
    }

    injectComment() {
        const comment = document.createComment('Powered by ScandiPWA (scandipwa.com)');
        document.querySelector('html').appendChild(comment);
    }

    // https://github.com/facebook/react-devtools/issues/191#issuecomment-367905536
    disableReactDevTools() {
        if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
            // eslint-disable-next-line no-restricted-syntax, fp/no-loops, no-unused-vars
            for (const [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value === 'function' ? () => {} : null;
            }
        }
    }

    configureAppBasedOnEnvironment() {
        const functionsToRun = process.env.NODE_ENV === 'production'
            ? this.productionFunctions
            : this.developmentFunctions;

        functionsToRun.forEach((func) => func());
    }

    render() {
        return (
            <App
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default AppContainer;
