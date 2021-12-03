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

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';

import { DownloadableLinksType } from 'Type/Downloadable.type';

import ProductDownloadableLinks from './ProductDownloadableLinks.component';

/** @namespace Component/ProductDownloadableLinks/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOpenInNewTab: state.ConfigReducer.downloadable_links_target_new_window,
    currencyCode: state.ConfigReducer.currencyData.current_currency_code
});

/** @namespace Component/ProductDownloadableLinks/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ProductDownloadableLinks/Container */
export class ProductDownloadableLinksContainer extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        currencyCode: PropTypes.string.isRequired,
        isRequired: PropTypes.bool,
        links: DownloadableLinksType,
        setLinkedDownloadables: PropTypes.func.isRequired,
        isOpenInNewTab: PropTypes.bool.isRequired
    };

    static defaultProps = {
        title: '',
        links: [],
        isRequired: false
    };

    state = {
        isLoading: true,
        selectedLinks: []
    };

    containerFunctions = {
        setSelectedCheckboxValues: this.setSelectedCheckboxValues.bind(this),
        setRef: this.setRef.bind(this)
    };

    formRef = createRef();

    componentDidMount() {
        const { links } = this.props;

        if (links) {
            this.stopLoading();
        }
    }

    componentDidUpdate(_, prevState) {
        const { links } = this.props;
        const {
            selectedLinks,
            isLoading
        } = this.state;

        const {
            selectedLinks: prevSelectedLinks
        } = prevState;

        if (links && isLoading) {
            this.stopLoading();
        }

        if (selectedLinks !== prevSelectedLinks) {
            this.updateSelectedOptionsArray();
        }
    }

    setRef(elem) {
        if (elem && this.formRef !== elem) {
            this.formRef = elem;
        }
    }

    containerProps() {
        const {
            isOpenInNewTab,
            isRequired,
            links,
            title,
            currencyCode
        } = this.props;
        const { isLoading, selectedLinks } = this.state;

        return {
            isOpenInNewTab,
            isRequired,
            links,
            title,
            isLoading,
            selectedLinks,
            currencyCode
        };
    }

    stopLoading() {
        this.setState({ isLoading: false });
    }

    updateSelectedOptionsArray() {
        const { setLinkedDownloadables } = this.props;
        const { selectedLinks } = this.state;

        setLinkedDownloadables(selectedLinks);
    }

    setSelectedCheckboxValues() {
        const { selectedLinks } = this.state;
        const checkboxes = this.formRef.querySelectorAll('input[type="checkbox"]:checked');
        const newSelectedLinks = Array.from(checkboxes, ({ value }) => value);

        if (selectedLinks !== newSelectedLinks) {
            this.setState({ selectedLinks: newSelectedLinks });
        }
    }

    getIsLinkSelected(id) {
        const { selectedLinks } = this.state;

        return selectedLinks.some(({ link_id }) => link_id === id);
    }

    render() {
        return (
            <ProductDownloadableLinks
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDownloadableLinksContainer);
