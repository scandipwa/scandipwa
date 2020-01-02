import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { default as Input } from './Input.component';
import './Input.style';

class InputContainer extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerProps = () => {
        const {
            // Invalid props
            dispatch,
            skipValue,
            selectOptions,
            // Props to be transformed
            autoComplete,
            autocomplete,
            isDisabled,
            formRef,
            value,
            // Props that are passed correctly from the beginning
            ...validProps
        } = this.props;
        
        return {
            ...validProps,
            autoComplete: autoComplete || autocomplete,
            disabled: isDisabled || false,
            ref: formRef,
            value: value || ""
        };
    }

    render() {
        return (
            <Input { ...this.containerProps() } />
        );
    }
}

export default InputContainer;
