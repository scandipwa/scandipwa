import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Framework/Component/SomethingWentWrong/Component/SomethingWentWrongComponent */
export class SomethingWentWrongComponent extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        trace: PropTypes.string,
        error: PropTypes.string
    };

    static defaultProps = {
        trace: '',
        error: ''
    };

    renderAction() {
        const { onClick } = this.props;

        return (
            <button onClick={ onClick }>
                { __('Try again') }
            </button>
        );
    }

    renderError() {
        const { error } = this.props;

        return (
            <h1>{ error }</h1>
        );
    }

    renderTrace() {
        const { trace } = this.props;

        if (process.env.NODE_ENV === 'production') {
            return null;
        }

        return (
            <code>{ trace }</code>
        );
    }

    render() {
        return (
            <div block="SomethingWentWrong">
                { this.renderError() }
                { this.renderTrace() }
                { this.renderAction() }
            </div>
        );
    }
}

export default SomethingWentWrongComponent;
