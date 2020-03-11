import PropTypes from 'prop-types';

class Input extends ExtensiblePureComponent {
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

export default middleware(Input, 'Component/Input/Component');
