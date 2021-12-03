import { ErrorDetailsType } from '@scandipwa/scandipwa/src/type/Error.type';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong.component';

/** @namespace Framework/Component/App/Component */
export class AppComponent extends PureComponent {
    static propTypes = {
        errorDetails: ErrorDetailsType.isRequired,
        isSomethingWentWrong: PropTypes.bool.isRequired,
        handleErrorReset: PropTypes.func.isRequired
    };

    rootComponents = [];

    contextProviders = [];

    renderRootComponents = () => this.rootComponents.map((render) => render());

    renderContextProviders() {
        const { isSomethingWentWrong } = this.props;

        const child = isSomethingWentWrong
            ? this.renderSomethingWentWrong
            : this.renderRootComponents;

        return this.contextProviders.reduce(
            (acc, render) => render(acc),
            [child()]
        );
    }

    renderSomethingWentWrong = () => {
        const {
            handleErrorReset,
            errorDetails
        } = this.props;

        return (
            <SomethingWentWrong
              onClick={ handleErrorReset }
              errorDetails={ errorDetails }
            />
        );
    };

    render() {
        return this.renderContextProviders();
    }
}

export default AppComponent;
