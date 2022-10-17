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

import CategoryConfigurableAttributes from 'Component/CategoryConfigurableAttributes';
import Loader from 'Component/Loader';
import Overlay from 'Component/Overlay';
import {
    ProductConfigurableAttribute,
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import ResetAttributes from 'Component/ResetAttributes';
import ResetButton from 'Component/ResetButton';
import { ReactElement } from 'Type/Common.type';

import { CATEGORY_FILTER_OVERLAY_ID } from './CategoryFilterOverlay.config';
import { CategoryFilterOverlayComponentProps } from './CategoryFilterOverlay.type';

import './CategoryFilterOverlay.style';

/** @namespace Component/CategoryFilterOverlay/Component */
export class CategoryFilterOverlayComponent extends PureComponent<CategoryFilterOverlayComponentProps> {
    renderFilters(): ReactElement {
        const {
            availableFilters = {},
            customFiltersValues,
            toggleCustomFilter,
            isMatchingInfoFilter,
            getFilterUrl,
            isSearchPage,
        } = this.props;

        const filters = availableFilters as unknown as Record<string, Partial<ProductConfigurableAttribute>>;

        return (
            <CategoryConfigurableAttributes
              mix={ { block: 'CategoryFilterOverlay', elem: 'Attributes' } }
              isReady={ isMatchingInfoFilter }
              configurable_options={ filters }
              getLink={ getFilterUrl }
              parameters={ customFiltersValues }
              updateConfigurableVariant={ toggleCustomFilter }
              isSearchPage={ isSearchPage }
            />
        );
    }

    renderSeeResults(): ReactElement {
        const { onSeeResultsClick } = this.props;

        return (
            <div
              block="CategoryFilterOverlay"
              elem="SeeResults"
            >
                <button
                  block="CategoryFilterOverlay"
                  elem="Button"
                  mix={ { block: 'Button' } }
                  onClick={ onSeeResultsClick }
                >
                    { __('SEE RESULTS') }
                </button>
            </div>
        );
    }

    renderResetButton(): ReactElement {
        const { onSeeResultsClick } = this.props;

        return (
            <ResetButton
              onClick={ onSeeResultsClick }
              mix={ { block: 'CategoryFilterOverlay', elem: 'ResetButton' } }
            />
        );
    }

    renderResetAttributes(): ReactElement {
        const { customFiltersValues, availableFilters, toggleCustomFilter } = this.props;

        return (
            <ResetAttributes
              customFiltersValues={ customFiltersValues }
              availableFilters={ availableFilters }
              toggleCustomFilter={ toggleCustomFilter }
            />
        );
    }

    renderHeading(): ReactElement {
        const { isContentFiltered } = this.props;

        return (
            <h3 block="CategoryFilterOverlay" elem="Heading" mods={ { isContentFiltered } }>
                { __('Shopping Options') }
            </h3>
        );
    }

    renderNoResults(): ReactElement {
        return (
            <p block="CategoryFilterOverlay" elem="NoResults">
                { __(`The selected filter combination returned no results.
                Please try again, using a different set of filters.`) }
            </p>
        );
    }

    renderEmptyFilters(): ReactElement {
        return (
            <>
                { this.renderNoResults() }
                { this.renderResetButton() }
                { this.renderSeeResults() }
            </>
        );
    }

    renderMinimalFilters(): ReactElement {
        return this.renderSeeResults();
    }

    renderDefaultFilters(): ReactElement {
        return (
            <>
                { this.renderHeading() }
                <div block="CategoryFilterOverlay" elem="ResetSection">
                    { this.renderResetAttributes() }
                    { this.renderResetButton() }
                </div>
                { this.renderFilters() }
            </>
        );
    }

    renderContent(): ReactElement {
        const {
            totalPages,
            areFiltersEmpty,
            isProductsLoading,
        } = this.props;

        if (!isProductsLoading && totalPages === 0) {
            return this.renderEmptyFilters();
        }

        if (areFiltersEmpty) {
            return this.renderMinimalFilters();
        }

        return (
            <>
                { this.renderDefaultFilters() }
                { this.renderSeeResults() }
            </>
        );
    }

    renderLoader(): ReactElement {
        const {
            isInfoLoading,
            availableFilters,
        } = this.props;

        const isLoaded = availableFilters && !!Object.keys(availableFilters).length;

        if (!isLoaded) { // hide loader if filters were not yet loaded (even once!)
            return null;
        }

        return (
            <Loader isLoading={ isInfoLoading } />
        );
    }

    render(): ReactElement {
        const {
            onVisible,
            onHide,
            totalPages,
            isProductsLoading,
            isContentFiltered,
            isCategoryAnchor,
            isSearchPage,
        } = this.props;

        // show CategoryFilterOverlay for 1. categories marked as `anchor` in Magento admin 2. Search page
        if ((!isProductsLoading && totalPages === 0 && !isContentFiltered) || (!isCategoryAnchor && !isSearchPage)) {
            return (
                <div block="CategoryFilterOverlay" />
            );
        }

        return (
            <Overlay
              onVisible={ onVisible }
              onHide={ onHide }
              mix={ { block: 'CategoryFilterOverlay' } }
              id={ CATEGORY_FILTER_OVERLAY_ID }
              isRenderInPortal={ false }
            >
                <div block="CategoryFilterOverlay" elem="Wrapper">
                    { this.renderContent() }
                    { this.renderLoader() }
                </div>
            </Overlay>
        );
    }
}

export default CategoryFilterOverlayComponent;
