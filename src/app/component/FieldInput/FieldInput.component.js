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

export class FieldInput extends PureComponent {
    static propTypes = {
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ])
    };

    static defaultProps = {
        formRef: () => {}
    };

    render() {
        const {
            formRef,
            ...validProps
        } = this.props;

        return (
            <input
              ref={ formRef }
              { ...validProps }
            />
        );
    }
}

export default FieldInput;
