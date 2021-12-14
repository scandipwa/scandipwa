import { ErrorDetailsType } from '@scandipwa/scandipwa/src/type/Error.type';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import SomethingWentWrong from './SomethingWentWrong.component';

/** @namespace Framework/Component/SomethingWentWrong/Container */
export class SomethingWentWrongContainer extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        errorDetails: ErrorDetailsType.isRequired
    };

    containerFunctions = {};

    containerProps() {
        const { onClick } = this.props;
        const { trace, error } = this.parseError();

        return {
            onClick,
            trace,
            error
        };
    }

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
