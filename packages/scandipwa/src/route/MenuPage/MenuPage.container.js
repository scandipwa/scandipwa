/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { MENU } from 'Component/Header/Header.config';
import Menu from 'Component/Menu';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { HistoryType } from 'Type/Router.type';

/** @namespace Route/MenuPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Route/MenuPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Route/MenuPage/Container */
export class MenuPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        history: HistoryType.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    __construct() {
        this.redirectIfNotOnMobile();
    }

    componentDidMount() {
        const { updateMeta, changeHeaderState } = this.props;

        updateMeta({ title: __('Menu') });
        changeHeaderState({
            name: MENU,
            onBackClick: () => history.goBack()
        });
    }

    componentDidUpdate() {
        this.redirectIfNotOnMobile();
    }

    redirectIfNotOnMobile() {
        const { history, isMobile } = this.props;

        if (!isMobile) {
            history.push('/');
        }
    }

    render() {
        return (
            <main block="MenuPage">
                <Menu />
            </main>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MenuPageContainer)
);
