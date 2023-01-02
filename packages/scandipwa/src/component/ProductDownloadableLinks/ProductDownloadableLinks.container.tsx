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
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import ProductDownloadableLinks from './ProductDownloadableLinks.component';
import {
    ProductDownloadableLinksComponentContainerPropKeys,
    ProductDownloadableLinksComponentProps,
    ProductDownloadableLinksContainerFunctions,
    ProductDownloadableLinksContainerMapDispatchProps,
    ProductDownloadableLinksContainerMapStateProps,
    ProductDownloadableLinksContainerProps,
    ProductDownloadableLinksContainerState,
} from './ProductDownloadableLinks.type';

/** @namespace Component/ProductDownloadableLinks/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductDownloadableLinksContainerMapStateProps => ({
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window,
    currencyCode: state.ConfigReducer.currencyData.current_currency_code,
});

/** @namespace Component/ProductDownloadableLinks/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductDownloadableLinksContainerMapDispatchProps => ({});

/** @namespace Component/ProductDownloadableLinks/Container */
export class ProductDownloadableLinksContainer<
P extends Readonly<ProductDownloadableLinksContainerProps> = Readonly<ProductDownloadableLinksContainerProps>,
S extends ProductDownloadableLinksContainerState = ProductDownloadableLinksContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductDownloadableLinksContainerProps> = {
        title: '',
        links: [],
        isRequired: false,
    };

    state: S = {
        isLoading: true,
        selectedLinks: [],
    } as unknown as S;

    containerFunctions: ProductDownloadableLinksContainerFunctions = {
        setSelectedCheckboxValues: this.setSelectedCheckboxValues.bind(this),
        setRef: this.setRef.bind(this),
    };

    formRef: HTMLElement | null = null;

    componentDidMount(): void {
        const { links } = this.props;

        if (links) {
            this.stopLoading();
        }
    }

    componentDidUpdate(
        _: ProductDownloadableLinksContainerProps,
        prevState: ProductDownloadableLinksContainerState,
    ): void {
        const { links } = this.props;
        const {
            selectedLinks,
            isLoading,
        } = this.state;

        const {
            selectedLinks: prevSelectedLinks,
        } = prevState;

        if (links && isLoading) {
            this.stopLoading();
        }

        if (selectedLinks !== prevSelectedLinks) {
            this.updateSelectedOptionsArray();
        }
    }

    setRef(elem: HTMLElement | null): void {
        if (elem && this.formRef !== elem) {
            this.formRef = elem;
        }
    }

    containerProps(): Pick<ProductDownloadableLinksComponentProps, ProductDownloadableLinksComponentContainerPropKeys> {
        const {
            isOpenInNewTab,
            isRequired,
            links,
            title,
            currencyCode,
        } = this.props;
        const { isLoading, selectedLinks } = this.state;

        return {
            isOpenInNewTab,
            isRequired,
            links,
            title,
            isLoading,
            selectedLinks,
            currencyCode,
        };
    }

    stopLoading(): void {
        this.setState({ isLoading: false });
    }

    updateSelectedOptionsArray(): void {
        const { setLinkedDownloadables } = this.props;
        const { selectedLinks } = this.state;

        setLinkedDownloadables(selectedLinks);
    }

    setSelectedCheckboxValues(): void {
        const { selectedLinks } = this.state;
        const checkboxes = this.formRef?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked') || [];
        const newSelectedLinks = Array.from(checkboxes, ({ value }) => value);

        if (selectedLinks !== newSelectedLinks) {
            this.setState({ selectedLinks: newSelectedLinks });
        }
    }

    render(): ReactElement {
        return (
            <ProductDownloadableLinks
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDownloadableLinksContainer);
