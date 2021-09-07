/* eslint-disable */
import { lazy, Suspense, useEffect, useState } from 'react';

const {
    NEXTJS_PAGES
} = process.env;

const pages = JSON.parse(NEXTJS_PAGES);
const pageRoutes = Object.keys(pages);

const isMatchingRoute = (route, pathname) => {
    const routeRe = route
        .replace(/\[[^\]]+\]/ig, '[^\\/]+')
        .replace(/index/ig, '/')
        .replace(/\/+$/, '');

    const re = new RegExp(`^${routeRe}$`, 'i');

    return re.test(pathname.replace(/\/+$/, ''));
};

const FallbackComponent = () => (<div>loading...</div>);

// const getResult = async (module) => {
//     const result = await import(module);
//     return result;
// }

// eslint-disable-next-line react/prop-types
const PageComponent = ({ route, type }) => {
    // const filepath = `@scandipwa/scandipwa/pages/${route}`;
    const filepath = `@scandipwa/scandipwa/pages/index`;
    const RouteComponent = lazy(() => import(filepath));
    // const [props, setProps] = useState({});
    const props = {};

    return null;

    return (
        <Suspense fallback={ <FallbackComponent /> }>
            <RouteComponent {...props} />
        </Suspense>
    );
};

const render = (args, callback) => {
    const { pathname } = location;
    const matchingRoute = pageRoutes.find((r) => isMatchingRoute(r, pathname));

    if (matchingRoute) {
        return (
            <PageComponent
              route={ matchingRoute }
              type={ pages[matchingRoute] }
            />
        );
    }

    return callback(...args);
};

export default {
    'Component/App/Component': {
        'member-function': {
            render
        }
    }
};
