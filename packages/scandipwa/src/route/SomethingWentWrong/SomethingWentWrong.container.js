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
import { ErrorDetailsType } from 'Type/Error.type';

import SomethingWentWrong from './SomethingWentWrong.component';

/** @namespace Route/SomethingWentWrong/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta))
});

/** @namespace Route/SomethingWentWrong/Container */
export class SomethingWentWrongContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        errorDetails: ErrorDetailsType.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Something went wrong!') });
    }

    containerProps() {
        const { onClick, errorDetails } = this.props;

        return { onClick, errorDetails };
    }

    render() {
        return (
            <SomethingWentWrong
              { ...this.containerProps() }
            />
        );
    }
}

/** @namespace Route/SomethingWentWrong/Container/mapStateToProps */
export const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SomethingWentWrongContainer);
