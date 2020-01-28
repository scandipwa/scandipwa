import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
    static propTypes = {
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({})
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

export default Input;
