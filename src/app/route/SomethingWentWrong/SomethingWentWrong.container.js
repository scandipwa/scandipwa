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

import { updateMeta } from 'Store/Meta/Meta.action';

import SomethingWentWrong from './SomethingWentWrong.component';

/** @namespace Route/SomethingWentWrong/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta))
});

/** @namespace Route/SomethingWentWrong/Container */
export class SomethingWentWrongContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Something went wrong!') });
    }

    render() {
        return (
            <SomethingWentWrong
              { ...this.props }
            />
        );
    }
}

/** @namespace Route/SomethingWentWrong/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SomethingWentWrongContainer);
