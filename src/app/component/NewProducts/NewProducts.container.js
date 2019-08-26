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

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TestWidget from 'Component/TestWidget';
import { prepareQuery } from 'Util/Query';
import { ProductListQuery } from 'Query';
import { executeGet } from 'Util/Request';

const mapStateToProps = state => ({
    timezone: state.ConfigReducer.timezone
});

export class NewProductsContainer extends PureComponent {
    static propTypes = {
        category: PropTypes.string,
        cacheLifetime: PropTypes.number,
        productsCount: PropTypes.number,
        productsPerPage: PropTypes.number,
        timezone: PropTypes.string.isRequired
    }

    static defaultProps = {
        category: 'men',
        productsCount: 10,
        productsPerPage: 5,
        cacheLifetime: 86400
    }

    containerProps = () => ({
        products: this._getProducts()
    });

    /**
     * Calculates date for request in server locale and with ttl error
     *
     * @returns {Date}
     * @memberof NewProducts
     */
    _getRequestDate() {
        const { cacheLifetime, timezone: timeZone } = this.props;

        const now = new Date();
        const serverNow = new Date(now.toLocaleString('en', { timeZone }));

        const serverNowTime = serverNow.getTime();
        const ttl = cacheLifetime * 1000;

        const requestTime = serverNowTime - (serverNowTime % ttl);
        const requestDate = new Date(requestTime);

        return requestDate.toISOString().slice(0, 10);
    }

    _getProducts() {
        const {
            timezone,
            category: categoryUrlPath,
            productsCount: pageSize,
            cacheLifetime
        } = this.props;

        if (!timezone) return [];

        const newToDate = this._getRequestDate();

        const options = {
            args: {
                filter: {
                    categoryUrlPath,
                    newToDate
                },
                currentPage: 1,
                pageSize
            }
        };

        const query = [ProductListQuery.getQuery(options)];
        // console.log(newToDate);
        executeGet(prepareQuery(query), 'NewProducts', cacheLifetime)
            .then(console.log)
            .catch(console.error);

        // return ;
    }

    render() {
        return (
            <TestWidget
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, null)(NewProductsContainer);
