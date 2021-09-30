/**
 * This is a plugin file for the Router component.
 * The namespace of Router component class is:
 * Router/Component/Router/Component/RouterComponent
 * it is located in @scandipwa/router extension in:
 * node_modules/@scandipwa/router/src/component/Router/Router.component.js
 *
 * Learn more about plugins in docs:
 * https://scandipwa.gitbook.io/create-scandipwa-app/extensions/application-plugins
 */

import { createElement } from 'react';

import WelcomePage from '../component/WelcomePage';

const addWelcomePageRoute = (member) => [
    ...member,
    {
        position: 1000,
        path: '/',
        render: (props) => createElement(WelcomePage, props)
    }
];

export default {
    'Router/Component/Router/Component/RouterComponent': {
        'member-property': {
            switchRoutesList: addWelcomePageRoute
        }
    }
};
