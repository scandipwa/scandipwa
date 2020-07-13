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
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta';
import Menu from 'Component/Menu';
import { HistoryType } from 'Type/Common';
import { withRouter } from 'react-router';
import isMobile from 'Util/Mobile';

import './MenuPage.style';

/** @namespace Route/MenuPage/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta))
});

/** @namespace Route/MenuPage/Container */
export class MenuPageContainer extends ExtensiblePureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        history: HistoryType.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Menu') });
        this.redirectIfNotOnMobile();
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

/** @namespace Route/MenuPage/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = state => ({});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MenuPageContainer)
);
