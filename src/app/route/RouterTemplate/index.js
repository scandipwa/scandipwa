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
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CartPage from 'Route/CartPage';

import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';

import { AppRouter as BaseRouter } from '../../../../../../../../vendor/scandipwa/source/src/app/route';

class AppRouter extends BaseRouter {
    getAdditionalRoutes() {
        return (
            <Route path="/kek" exact component={ CartPage } />
        );
    }

    render() {
        console.log('template is here!')
        return (
            super.render()
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateHeaderAndFooter: (options) => {
        HeaderAndFooterDispatcher.handleData(dispatch, options);
    }
});

const AppRouterContainer = connect(() => ({}), mapDispatchToProps)(AppRouter);

export default AppRouterContainer;
