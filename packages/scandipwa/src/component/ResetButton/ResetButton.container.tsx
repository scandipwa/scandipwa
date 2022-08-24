/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

<<<<<<< HEAD:packages/scandipwa/src/component/ResetButton/ResetButton.container.tsx
import { ReactElement } from 'Type/Common.type';
=======
import { MixType } from 'Type/Common.type';
import history from 'Util/History';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/ResetButton/ResetButton.container.js
import { setQueryParams } from 'Util/Url';

import ResetButton from './ResetButton.component';
import {
    ResetButtonComponentContainerPropKeys,
    ResetButtonComponentProps,
    ResetButtonContainerFunctions,
    ResetButtonContainerProps
} from './ResetButton.type';

/** @namespace Component/ResetButton/Container */
<<<<<<< HEAD:packages/scandipwa/src/component/ResetButton/ResetButton.container.tsx
export class ResetButtonContainer extends PureComponent<ResetButtonContainerProps> {
    static defaultProps: Partial<ResetButtonContainerProps> = {
=======
export class ResetButtonContainer extends PureComponent {
    static propTypes = {
        mix: MixType,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/ResetButton/ResetButton.container.js
        mix: {}
    };

    containerFunctions: ResetButtonContainerFunctions = {
        resetFilters: this.resetFilters.bind(this)
    };

    containerProps(): Pick<ResetButtonComponentProps, ResetButtonComponentContainerPropKeys> {
        const { mix, onClick } = this.props;

        return {
            mix,
            onClick,
            isContentFiltered: this.isContentFiltered()
        };
    }

<<<<<<< HEAD:packages/scandipwa/src/component/ResetButton/ResetButton.container.tsx
    resetFilters(): void {
        const { location, history } = this.props;
=======
    resetFilters() {
        const { location } = history;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/ResetButton/ResetButton.container.js

        setQueryParams({
            customFilters: '',
            priceMin: '',
            priceMax: '',
            page: ''
        }, location, history);
    }

    isContentFiltered(): boolean {
        const { customFilters, priceMin, priceMax } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

<<<<<<< HEAD:packages/scandipwa/src/component/ResetButton/ResetButton.container.tsx
    urlStringToObject(): Record<string, string> {
        const { location: { search = '' } } = this.props;
=======
    urlStringToObject() {
        const { location: { search = '' } } = history;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/ResetButton/ResetButton.container.js

        return search.substr(1).split('&').reduce((acc, part) => {
            const [key, value] = part.split('=');

            return { ...acc, [ key ]: value };
        }, {});
    }

    render(): ReactElement {
        return (
            <ResetButton
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ResetButtonContainer;
