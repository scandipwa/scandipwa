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

import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import { setQueryParams } from 'Util/Url';

import ResetButton from './ResetButton.component';
import {
    ResetButtonComponentContainerPropKeys,
    ResetButtonComponentProps,
    ResetButtonContainerFunctions,
    ResetButtonContainerProps,
} from './ResetButton.type';

/** @namespace Component/ResetButton/Container */
export class ResetButtonContainer extends PureComponent<ResetButtonContainerProps> {
    static defaultProps: Partial<ResetButtonContainerProps> = {
        mix: {},
    };

    containerFunctions: ResetButtonContainerFunctions = {
        resetFilters: this.resetFilters.bind(this),
    };

    containerProps(): Pick<ResetButtonComponentProps, ResetButtonComponentContainerPropKeys> {
        const { mix, onClick } = this.props;

        return {
            mix,
            onClick,
            isContentFiltered: this.isContentFiltered(),
        };
    }

    resetFilters(): void {
        const { location } = history;

        setQueryParams({
            customFilters: '',
            priceMin: '',
            priceMax: '',
            page: '',
        }, location, history);
    }

    isContentFiltered(): boolean {
        const { customFilters, priceMin, priceMax } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject(): Record<string, string> {
        const { location: { search = '' } } = history;

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
