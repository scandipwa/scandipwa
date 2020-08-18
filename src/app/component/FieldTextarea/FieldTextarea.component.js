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

class FieldTextarea extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool,
        maxLength: PropTypes.number,
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        rows: PropTypes.number
    };

    static defaultProps = {
        formRef: () => {},
        isDisabled: false,
        rows: 4,
        maxLength: null
    };

    render() {
        const {
            id,
            value,
            name,
            rows,
            formRef,
            isDisabled,
            maxLength
        } = this.props;

        return (
            <textarea
              ref={ formRef }
              id={ id }
              name={ name }
              rows={ rows }
              value={ value }
              disabled={ isDisabled }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              maxLength={ maxLength }
            />
        );
    }
}

export default FieldTextarea;
