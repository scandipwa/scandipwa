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

/** @namespace Component/FieldTextarea/Component */
export class FieldTextarea extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool,
        maxLength: PropTypes.number,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onClick: PropTypes.func,
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        rows: PropTypes.number,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        formRef: () => {},
        isDisabled: false,
        rows: 4,
        maxLength: null,
        onChange: () => {},
        onFocus: () => {},
        onClick: () => {},
        placeholder: null
    };

    render() {
        const {
            id,
            value,
            name,
            rows,
            formRef,
            isDisabled,
            maxLength,
            onChange,
            onFocus,
            onClick,
            placeholder
        } = this.props;

        return (
            <textarea
              ref={ formRef }
              id={ id }
              name={ name }
              rows={ rows }
              value={ value }
              disabled={ isDisabled }
              onChange={ onChange }
              onFocus={ onFocus }
              onClick={ onClick }
              maxLength={ maxLength }
              placeholder={ placeholder }
            />
        );
    }
}

export default FieldTextarea;
