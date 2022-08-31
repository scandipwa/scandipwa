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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { MixType } from 'Type/Common.type';
import history from 'Util/History';
import { setQueryParams } from 'Util/Url';

import ResetButton from './ResetButton.component';

/** @namespace Component/ResetButton/Container */
export class ResetButtonContainer extends PureComponent {
    static propTypes = {
        mix: MixType,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        mix: {}
    };

    containerFunctions = {
        resetFilters: this.resetFilters.bind(this)
    };

    containerProps() {
        const { mix, onClick } = this.props;

        return {
            mix,
            onClick,
            isContentFiltered: this.isContentFiltered()
        };
    }

    resetFilters() {
        const { location } = history;

        setQueryParams({
            customFilters: '',
            priceMin: '',
            priceMax: '',
            page: ''
        }, location, history);
    }

    isContentFiltered() {
        const { customFilters, priceMin, priceMax } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject() {
        const { location: { search = '' } } = history;

        return search.substr(1).split('&').reduce((acc, part) => {
            const [key, value] = part.split('=');

            return { ...acc, [key]: value };
        }, {});
    }

    render() {
        return (
            <ResetButton
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ResetButtonContainer;
