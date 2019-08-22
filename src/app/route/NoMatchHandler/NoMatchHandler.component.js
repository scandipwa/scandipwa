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

import { Component } from 'react';
import PropTypes from 'prop-types';
import NoMatch from 'Route/NoMatch';
import { LocationType } from 'Type/Router';
import { ChildrenType } from 'Type/Common';

class NoMatchHandler extends Component {
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
            window.scrollTo(0, 0);
            this.onRouteChanged();
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
        if (noMatch) return <NoMatch />;
        return children;
    }
}

export default NoMatchHandler;
