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

import './MenuPage.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { MENU } from 'Component/Header/Header.config';
import Menu from 'Component/Menu';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { HistoryType } from 'Type/Common';
import isMobile from 'Util/Mobile';

export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export class MenuPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        history: HistoryType.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { updateMeta, changeHeaderState } = this.props;
        updateMeta({ title: __('Menu') });
        this.redirectIfNotOnMobile();
        changeHeaderState({
            name: MENU,
            onBackClick: () => history.goBack()
        });
    }

    redirectIfNotOnMobile() {
        const { history } = this.props;

        if (!isMobile.any() && !isMobile.tablet()) {
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

export default withRouter(connect(null, mapDispatchToProps)(MenuPageContainer));
