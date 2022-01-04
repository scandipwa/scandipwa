/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { MatchType } from 'Type/Router.type';

import OrderPrintPage from './OrderPrintPage.component';

/** @namespace Route/OrderPrintPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    logo_height: state.ConfigReducer.logo_height,
    logo_width: state.ConfigReducer.logo_width
});

/** @namespace Route/OrderPrintPage/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Route/OrderPrintPage/Container */
export class OrderPrintPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        logo_alt: PropTypes.string.isRequired,
        logo_src: PropTypes.string.isRequired,
        logo_height: PropTypes.number.isRequired,
        logo_width: PropTypes.number.isRequired
    };

    containerProps() {
        const {
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match
        } = this.props;

        return {
            logo_alt,
            logo_src,
            logo_height,
            logo_width,
            match
        };
    }

    render() {
        return (
                <OrderPrintPage
                  { ...this.containerProps() }
                />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderPrintPageContainer)
);
