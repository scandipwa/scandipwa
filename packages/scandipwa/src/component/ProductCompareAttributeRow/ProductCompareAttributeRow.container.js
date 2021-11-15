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

import { DeviceType } from 'Type/Device.type';

import ProductCompareAttributeRow from './ProductCompareAttributeRow.component';

/** @namespace Component/ProductCompareAttributeRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompareAttributeRow/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ProductCompareAttributeRow/Container */
export class ProductCompareAttributeRowContainer extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        device: DeviceType.isRequired
    };

    containerProps() {
        const { title, values, device } = this.props;

        return { title, values, device };
    }

    render() {
        return (
            <ProductCompareAttributeRow
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareAttributeRowContainer);
