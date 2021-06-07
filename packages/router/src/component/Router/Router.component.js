import { createBrowserHistory } from 'history';
import { createElement, PureComponent } from 'react';
import { Router as ReactRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

export const history = createBrowserHistory({ basename: '/' });

/** @namespace Router/Component/Router/Component/RouterComponent */
export class RouterComponent extends PureComponent {
    static propTypes = {
    };

    /**
     * @type {Array.<{ position: Number, render: Function }>}
     * @memberof Router
     */
    beforeSwitchList = [];

    /**
     * @type {Array.<{ position: Number, render: Function, path: String, exact: Boolean }>}
     * @memberof Router
     */
    switchRoutesList = [];

    /**
     * @type {Array.<{ position: Number, render: Function }>}
     * @memberof Router
     */
    afterSwitchList = [];

    renderBeforeComponents() {
        return this.renderSortedList(
            this.beforeSwitchList,
            this.renderComponent
        );
    }

    renderAfterComponents() {
        return this.renderSortedList(
            this.afterSwitchList,
            this.renderComponent
        );
    }

    renderSwitchRoutes() {
        return this.renderSortedList(
            this.switchRoutesList,
            this.renderSwitchRoute
        );
    }

    renderComponent({ render }) {
        if (!render) {
            return null;
        }

        return render;
    }

    renderSortedList(items, renderer) {
        return items.sort(
            (a, b) => a.position - b.position
        ).map(
            ({ position, ...props }) => renderer({ key: position, ...props })
        );
    }

    renderSwitchRoute(props) {
        return createElement(Route, props);
    }

    renderSwitch() {
        return (
            <Switch>
                { this.renderSwitchRoutes() }
            </Switch>
        );
    }

    renderRouterContent() {
        return (
            <>
                { this.renderBeforeComponents() }
                { this.renderSwitch() }
                { this.renderAfterComponents() }
            </>
        );
    }

    render() {
        return (
            <ReactRouter history={ history }>
                { this.renderRouterContent() }
            </ReactRouter>
        );
    }
}

export default RouterComponent;
