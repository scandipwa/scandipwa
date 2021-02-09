/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import NoMatch from 'Route/NoMatch';
import { ChildrenType } from 'Type/Common';
import { LocationType } from 'Type/Router';

/** @namespace Route/NoMatchHandler/Component */
export class NoMatchHandler extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        noMatch: PropTypes.bool.isRequired,
        updateNoMatch: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        const { location: { pathname: newPathname } } = this.props;
        const { location: { pathname } } = prevProps;

        if (newPathname !== pathname) {
            // 'window.scrollTo' is used to set correct scroll position for newly opened page. Previously we passed (0, 0)
            // It caused scroll issue in Firefox, when navigating back from ProductPage to CategoryPage
            // Not calling 'window.scrollTo' did not help, but passing dummy value for 'y' seems to fix it
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                window.scrollTo(0, 1);
            } else {
                window.scrollTo(0, 0);
            }

            this.onRouteChanged();
        }
    }

    componentWillUnmount() {
        const {
            noMatch,
            updateNoMatch
        } = this.props;

        if (noMatch) {
            updateNoMatch({ noMatch: false });
        }
    }

    /**
     * On browser route change
     * @return {void}
     */
    onRouteChanged() {
        const {
            noMatch,
            updateNoMatch
        } = this.props;

        if (noMatch) {
            updateNoMatch({ noMatch: false });
        }
    }

    render() {
        const { children, noMatch } = this.props;
        if (noMatch) {
            return <NoMatch />;
        }

        return children;
    }
}

export default NoMatchHandler;
