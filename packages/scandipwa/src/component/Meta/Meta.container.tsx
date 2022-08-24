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

import Meta from './Meta.component';
import {
    MetaComponentProps,
    MetaContainerMapDispatchProps,
    MetaContainerMapStateProps,
    MetaContainerProps,
    MetaContainerPropsKeys
} from './Meta.type';

/** @namespace Component/Meta/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MetaContainerMapStateProps => ({
    default_description: state.MetaReducer.default_description,
    default_keywords: state.MetaReducer.default_keywords,
    default_title: state.MetaReducer.default_title,
    canonical_url: state.MetaReducer.canonical_url,
    title_prefix: state.MetaReducer.title_prefix,
    title_suffix: state.MetaReducer.title_suffix,
    description: state.MetaReducer.description,
    keywords: state.MetaReducer.keywords,
    title: state.MetaReducer.title,
    robots: state.MetaReducer.robots,
    status_code: state.MetaReducer.status_code
});

/** @namespace Component/Meta/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MetaContainerMapDispatchProps => ({});

/** @namespace Component/Meta/Container */
export class MetaContainer extends PureComponent<MetaContainerProps> {
    static defaultProps: Partial<MetaContainerProps> = {
        default_description: '',
        default_keywords: '',
        default_title: '',
        canonical_url: '',
        title_prefix: '',
        title_suffix: '',
        description: '',
        keywords: '',
        title: '',
        robots: '',
        status_code: ''
    };

    containerProps(): Pick<MetaComponentProps, MetaContainerPropsKeys> {
        const {
            canonical_url,
            default_title,
            title,
            title_prefix,
            title_suffix
        } = this.props;

        return {
            metadata: this._getMetadata(),
            canonical_url,
            default_title,
            title,
            title_prefix,
            title_suffix
        };
    }

    _generateMetaFromMetadata(metadata: Record<string, string | undefined>, param = 'name'): Record<string, string>[] {
        return Object.entries(metadata).reduce((acc: Record<string, string>[], [key, value]) => (
            value
                ? [...acc, { [ param ]: key, content: `${value}` }]
                : acc
        ), []);
    }

    _getTitle(): string | undefined {
        const { title, default_title } = this.props;

        return String(title || default_title);
    }

    _getDescription(): string | undefined {
        const { description, default_description } = this.props;

        return description || default_description;
    }

    _getKeywords(): string | undefined {
        const { keywords, default_keywords } = this.props;

        return keywords || default_keywords;
    }

    _getRobots(): string | undefined {
        const { robots } = this.props;

        return robots;
    }

    _getStatusCode(): string | undefined {
        const { status_code } = this.props;

        return status_code;
    }

    _getMetadata(): Record<string, string>[] {
        const meta: Record<string, string | undefined> = {
            title: this._getTitle(),
            description: this._getDescription(),
            keywords: this._getKeywords(),
            robots: this._getRobots(),
            'render:status_code': this._getStatusCode()
        };

        return this._generateMetaFromMetadata(meta);
    }

    render(): ReactElement {
        return (
            <Meta
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaContainer);
