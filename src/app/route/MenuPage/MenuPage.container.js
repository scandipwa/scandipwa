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
import { connect } from 'react-redux';
import { updateMeta } from 'Store/Meta';
import MenuOverlay from 'Component/MenuOverlay';
import './MenuPage.style';

export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta))
});

export class MenuPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Menu') });
    }

    render() {
        return (
            <main block="MenuPage">
                <MenuOverlay />
            </main>
        );
    }
}

export default connect(null, mapDispatchToProps)(MenuPageContainer);
