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
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta';
import { CartDispatcher } from 'Store/Cart';
import { ConfigDispatcher } from 'Store/Config';
import { WishlistDispatcher } from 'Store/Wishlist';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';

import Router from './Router.component';

/** @namespace Component/Router/Container/mapStateToProps */
export const mapStateToProps = state => ({
    isLoading: state.ConfigReducer.isLoading,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    isOffline: state.OfflineReducer.isOffline,
    isBigOffline: state.OfflineReducer.isBig
});

/** @namespace Component/Router/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta)),
    init: (options) => {
        WishlistDispatcher.updateInitialWishlistData(dispatch);
        CartDispatcher.updateInitialCartData(dispatch);
        ConfigDispatcher.handleData(dispatch);
        HeaderAndFooterDispatcher.handleData(dispatch, options);
    }
});

/** @namespace Component/Router/Container */
export class RouterContainer extends ExtensiblePureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        isLoading: PropTypes.bool,
        isBigOffline: PropTypes.bool
    };

    static defaultProps = {
        default_description: '',
        default_keywords: '',
        default_title: '',
        title_prefix: '',
        title_suffix: '',
        isLoading: true,
        isBigOffline: false
    };

    constructor(props) {
        super(props);

        this.initializeApplication();
    }

    initializeApplication() {
        const { init } = this.props;
        init(this.getHeaderAndFooterOptions());
    }

    containerProps = () => {
        const { isBigOffline } = this.props;

        return { isBigOffline };
    };

    componentDidUpdate(prevProps) {
        const { isLoading, updateMeta } = this.props;
        const { isLoading: prevIsLoading } = prevProps;

        if (!isLoading && isLoading !== prevIsLoading) {
            const {
                default_description,
                default_keywords,
                default_title,
                title_prefix,
                title_suffix
            } = this.props;

            updateMeta({
                default_title,
                title: default_title,
                default_description,
                description: default_description,
                default_keywords,
                keywords: default_keywords,
                title_prefix,
                title_suffix
            });
        }
    }

    getCmsBlocksToRequest() {
        // TODO: remove!

        const blocks = Object.values(window.contentConfiguration).reduce(
            (acc, config) => [
                ...acc,
                ...Object.entries(config).reduce(
                    (acc, [key, identifier]) => ((key.indexOf('cms') === -1)
                        ? acc
                        : [...acc, identifier]
                    ),
                    []
                )
            ],
            []
        ).filter((value, index, self) => value && self.indexOf(value) === index);

        return blocks.length ? blocks : ['social-links'];
    }

    getHeaderAndFooterOptions() {
        // TODO: remove!

        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            menu: { identifier: [header_menu || 'new-main-menu'] },
            footer: { identifiers: this.getCmsBlocksToRequest() }
        };
    }

    render() {
        return (
            <Router
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
