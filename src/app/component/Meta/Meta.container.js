import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LOGO_MEDIA } from 'Util/Media/Media';
import media from 'Util/Media';

import Meta from './Meta.component';

export const mapStateToProps = state => ({
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    base_url: state.ConfigReducer.base_url
});

const SWPWA_LOGO_WIDTH = 350;
const SWPWA_LOGO_HEIGHT = 210;
const SWPWA_LOGO_URL = 'https://scandiweb.com/assets/images/services/scandipwa/ScandiPWA-logo.png';

export class MetaContainer extends PureComponent {
    static propTypes = {
        pathname: PropTypes.string,
        base_url: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        metaObject: PropTypes.shape({
            name: PropTypes.string,
            meta_title: PropTypes.string,
            meta_description: PropTypes.string,
            meta_keyword: PropTypes.string,
            imageWidth: PropTypes.number,
            imageHeight: PropTypes.number
        }),
        canonical_url: PropTypes.string,
        header_logo_src: PropTypes.string,
        logo_alt: PropTypes.string
    };

    static defaultProps = {
        pathname: '',
        base_url: '',
        title_prefix: '',
        title_suffix: '',
        default_description: '',
        default_keywords: '',
        default_title: '',
        canonical_url: '',
        header_logo_src: '',
        logo_alt: '',
        metaObject: {
            imageWidth: SWPWA_LOGO_WIDTH,
            imageHeight: SWPWA_LOGO_HEIGHT
        }
    };

    containerProps = () => ({
        meta: this._getMeta()
    });

    _generateMetaFromMetadata(metadata, param = 'name') {
        return Object.entries(metadata).reduce((acc, [key, value]) => (
            value
                ? [...acc, { [param]: key, content: `${value}` }]
                : acc
        ), []);
    }

    _getMetadata() {
        const {
            metaObject,
            default_description,
            default_keywords,
            default_title
        } = this.props;

        const {
            meta_title = default_title,
            meta_keywords = default_keywords,
            meta_keyword = meta_keywords,
            meta_description = default_description
        } = metaObject;

        const metadata = {
            title: meta_title,
            keywords: meta_keyword,
            description: meta_description
        };

        return this._generateMetaFromMetadata(metadata);
    }

    _getUrl() {
        const { base_url, canonical_url, pathname } = this.props;

        return canonical_url || `${ base_url }${ pathname }`;
    }

    _getImageSrc() {
        const { header_logo_src, metaObject: { imageSrc } } = this.props;

        if (imageSrc) return imageSrc;

        return header_logo_src
            ? media(header_logo_src, LOGO_MEDIA)
            : SWPWA_LOGO_URL;
    }

    _getOgMetadata() {
        const {
            metaObject,
            default_description,
            default_keywords,
            default_title,
            logo_alt,
            metaObject: {
                imageHeight,
                imageWidth,
                imageAlt
            }
        } = this.props;

        const {
            meta_title = default_title,
            meta_keywords = default_keywords,
            meta_keyword = meta_keywords,
            meta_description = default_description
        } = metaObject;

        const ogMetadata = {
            'og:title': meta_title,
            'og:keywords': meta_keyword,
            'og:description': meta_description,
            'og:url': this._getUrl(),
            'og:type': 'website',
            'og:image': this._getImageSrc(),
            'og:image:width': imageWidth,
            'og:image:height': imageHeight,
            'og:image:alt': imageAlt || logo_alt
        };

        return this._generateMetaFromMetadata(ogMetadata, 'property');
    }

    _getMeta() {
        return [
            ...this._getMetadata(),
            ...this._getOgMetadata()
        ];
    }

    render() {
        return (
            <Meta
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps)(MetaContainer);
