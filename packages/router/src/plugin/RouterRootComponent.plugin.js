import { createElement } from 'react';

import Router from '../component/Router';

const addRouterRootComponent = (member) => [
    ...member,
    () => createElement(Router, { key: 'router' })
];

export default {
    'Framework/Component/App/Component/AppComponent': {
        'member-property': {
            rootComponents: addRouterRootComponent
        }
    }
};
