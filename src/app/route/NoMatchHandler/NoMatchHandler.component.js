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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoMatch from 'Route/NoMatch';
import { LocationType } from 'Type/Router';

class NoMatchHandler extends Component {
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
            updateNoMatch,
            updateToggleHeaderAndFooter,
            location: { pathname }
        } = this.props;

        // by default enable header and footer on all views,
        // if necessary hide them in lower level components (checkout route for example)
        if (!pathname.includes('checkout')) {
            updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: true });
        }

        if (noMatch) {
            updateNoMatch({ noMatch: false });
        }
    }

    render() {
        const { children, noMatch } = this.props;

        if (noMatch) {
            return <NoMatch />;
        }

        return (
            <React.Fragment>
                { children }
            </React.Fragment>
        );
    }
}

NoMatchHandler.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    noMatch: PropTypes.bool.isRequired,
    updateNoMatch: PropTypes.func.isRequired,
    updateToggleHeaderAndFooter: PropTypes.func.isRequired,
    location: LocationType.isRequired
};

export default NoMatchHandler;
