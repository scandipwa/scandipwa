import { PureComponent } from 'react';

import Router from './Router.component';

/** @namespace Router/Component/Router/Container/RouterContainer */
export class RouterContainer extends PureComponent {
    static propTypes = {};

    containerFunctions = {};

    containerProps = () => ({});

    render() {
        return (
            <Router
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default RouterContainer;
