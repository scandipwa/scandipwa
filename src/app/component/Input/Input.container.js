import { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Input from './Input.component';

class InputContainer extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func,
        selectOptions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            disabled: PropTypes.bool,
            label: PropTypes.string
        })),
        isDisabled: PropTypes.bool,
        isControlled: PropTypes.bool,
        autocomplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        skipValue: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ])
    };

    static defaultProps = {
        value: '',
        autocomplete: 'off',
        isDisabled: false,
        isControlled: false,
        skipValue: false,
        selectOptions: [],
        dispatch: () => {}
    };

    containerProps = () => {
        const {
            // Invalid props
            dispatch,
            selectOptions,
            isControlled,

            // Props to be transformed
            isDisabled: disabled,
            autocomplete: autoComplete,
            skipValue,

            // Props that are passed correctly from the beginning
            ...validProps
        } = this.props;

        return {
            ...validProps,
            disabled,
            'data-skip-value': skipValue,
            autoComplete
        };
    };

    render() {
        return (
            <Input { ...this.containerProps() } />
        );
    }
}

export default InputContainer;
