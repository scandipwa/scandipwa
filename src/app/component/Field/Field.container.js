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

import Field from './Field.component';
import {
    CHECKBOX_TYPE,
    ENTER_KEY_CODE,
    NUMBER_TYPE,
    PASSWORD_TYPE,
    RADIO_TYPE,
    SELECT_TYPE,
    TEXT_TYPE,
    TEXTAREA_TYPE
} from './Field.config';

export class FieldContainer extends PureComponent {
    static propTypes = {
        isControlled: PropTypes.bool,
        checked: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        type: PropTypes.oneOf([
            TEXT_TYPE,
            NUMBER_TYPE,
            TEXTAREA_TYPE,
            PASSWORD_TYPE,
            RADIO_TYPE,
            CHECKBOX_TYPE,
            SELECT_TYPE
        ]).isRequired,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClick: PropTypes.func,
        onKeyPress: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number
    };

    static defaultProps = {
        min: 1,
        max: 99,
        checked: false,
        value: null,
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onClick: () => {},
        onKeyPress: () => {},
        isControlled: false
    };

    containerFunctions = {
        onChange: this.onChange.bind(this),
        handleChange: this.handleChange.bind(this),
        onChangeCheckbox: this.onChangeCheckbox.bind(this),
        onFocus: this.onFocus.bind(this),
        onKeyPress: this.onKeyPress.bind(this),
        onKeyEnterDown: this.onKeyEnterDown.bind(this),
        onClick: this.onClick.bind(this)
    };

    constructor(props) {
        super(props);

        const { checked } = props;
        const value = this.getInitialPropsValue();

        this.state = {
            value,
            checked
        };
    }

    componentDidUpdate(prevProps) {
        const { value: prevValue, checked: prevChecked } = prevProps;
        const { value: currentValue, checked: currChecked, type } = this.props;

        if (prevValue !== currentValue) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value: currentValue });
        }
        if (type === CHECKBOX_TYPE && currChecked !== prevChecked) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ checked: currChecked });
        }
    }

    getInitialPropsValue() {
        const { type, value } = this.props;

        if (value) {
            return value;
        }

        switch (type) {
        case NUMBER_TYPE:
            return 0;
        default:
            return '';
        }
    }

    containerProps = () => {
        const {
            checked: propsChecked
        } = this.props;

        const {
            type,
            checked,
            value
        } = this.state;

        return {
            checked: type === CHECKBOX_TYPE ? propsChecked : checked,
            value
        };
    };

    onChange(event) {
        if (typeof event === 'string' || typeof event === 'number') {
            return this.handleChange(event);
        }

        return this.handleChange(event.target.value);
    }

    onChangeCheckbox(event) {
        const { onChange } = this.props;
        const { target: { checked, value } } = event;

        if (onChange) {
            onChange(value, checked);
        }

        this.setState({ checked });
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (onFocus) {
            onFocus(event);
        }
    }

    onBlur(event) {
        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(event);
        }
    }

    onKeyPress(event) {
        const { onKeyPress } = this.props;

        if (onKeyPress) {
            onKeyPress(event);
        }
    }

    onKeyEnterDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            const value = event.target.value || 1;
            this.handleChange(value);
        }
    }

    onClick(event, selectValue = false) {
        const { onClick } = this.props;

        if (selectValue) {
            event.target.select();
        }
        if (onClick) {
            onClick(event);
        }
    }

    handleChange(value, shouldUpdate = true) {
        const {
            isControlled,
            onChange,
            type,
            min,
            max
        } = this.props;

        switch (type) {
        case NUMBER_TYPE:
            const isValueNaN = Number.isNaN(parseInt(value, 10));
            if (min > value || value > max || isValueNaN) {
                break;
            }
            if (onChange && shouldUpdate) {
                onChange(value);
            }
            if (!isControlled) {
                this.setState({ value });
            }
            break;
        default:
            if (onChange) {
                onChange(value);
            }
            if (!isControlled) {
                this.setState({ value });
            }
        }
    }

    render() {
        return (
            <Field
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldContainer;
