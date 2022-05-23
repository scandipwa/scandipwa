/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { ReactElement } from 'Type/Common.type';
import { setQueryParams } from 'Util/Url';

import ResetButton from './ResetButton.component';
import {
    ResetButtonComponentContainerPropKeys,
    ResetButtonComponentProps,
    ResetButtonContainerProps
} from './ResetButton.type';

/** @namespace Component/ResetButton/Container */
export class ResetButtonContainer extends PureComponent<ResetButtonContainerProps> {
    static defaultProps: Partial<ResetButtonContainerProps> = {
        mix: {}
    };

    containerFunctions = {
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

    resetFilters(): void {
        const { location, history } = this.props;

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

    urlStringToObject(): Record<string, string> {
        const { location: { search = '' } } = this.props;

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

export default withRouter(
    ResetButtonContainer
);
