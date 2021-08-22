/* eslint-disable */
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

import FieldNumber from './FieldNumber.component';

export class FieldNumberContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setRef: PropTypes.func.isRequired
    };

    state = {
        value: 0
    };

    containerFunctions = {
        handleValueChange: this.handleValueChange.bind(this)
    }

    componentDidMount() {
        const { attr: { defaultValue = 0 } } = this.props;
        this.setState({ value: defaultValue });
    }

    handleValueChange(value) {
        const {
            events: { onChange } = {},
            attr: { min = 0, max = 9999 } = {}
        } = this.props;
        const rangedValue = value < min ? min : value > max ? max : value;

        if (typeof onChange === 'function') {
            onChange(rangedValue);
        }

        this.setState({ value: rangedValue });
    }

    render() {
        return <FieldNumber
            { ...this.props }
            { ...this.state }
            { ...this.containerFunctions }
        />
    }
}

export default FieldNumber;
