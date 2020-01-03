import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Input.style';

class Input extends PureComponent {
    static propTypes = {
        formRef: PropTypes.func
    };

    static defaultProps = {
        formRef: () => {}
    }

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

export default Input;
