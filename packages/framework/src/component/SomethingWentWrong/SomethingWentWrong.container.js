import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import SomethingWentWrong from './SomethingWentWrong.component';

/** @namespace Framework/Component/SomethingWentWrong/Container/SomethingWentWrongContainer */
export class SomethingWentWrongContainer extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        errorDetails: PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            err: PropTypes.object,
            info: PropTypes.shape({
                componentStack: PropTypes.string
            })
        }).isRequired
    };

    containerFunctions = {};

    containerProps = () => {
        const { onClick } = this.props;
        const { trace, error } = this.parseError();

        return {
            onClick,
            trace,
            error
        };
    };

    parseError() {
        const {
            errorDetails: {
                err,
                info: {
                    componentStack
                } = {}
            }
        } = this.props;

        return {
            error: err.toString(),
            trace: componentStack
        };
    }

    render() {
        return (
            <SomethingWentWrong
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default SomethingWentWrongContainer;
