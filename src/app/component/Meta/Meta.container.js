import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LOGO_MEDIA } from 'Util/Media/Media';
import media from 'Util/Media';

import Meta from './Meta.component';

export const mapStateToProps = state => ({
    default_description: state.MetaReducer.default_description,
    default_keywords: state.MetaReducer.default_keywords,
    header_logo_src: state.MetaReducer.header_logo_src,
    default_title: state.MetaReducer.default_title,
    canonical_url: state.MetaReducer.canonical_url,
    title_prefix: state.MetaReducer.title_prefix,
    title_suffix: state.MetaReducer.title_suffix,
    description: state.MetaReducer.description,
    imageHeight: state.MetaReducer.imageHeight,
    imageWidth: state.MetaReducer.imageWidth,
    keywords: state.MetaReducer.keywords,
    imageSrc: state.MetaReducer.imageSrc,
    imageAlt: state.MetaReducer.imageAlt,
    base_url: state.MetaReducer.base_url,
    pathname: state.MetaReducer.pathname,
    title: state.MetaReducer.title
});

export const SWPWA_LOGO_WIDTH = 350;
export const SWPWA_LOGO_HEIGHT = 210;
export const SWPWA_LOGO_URL = 'https://scandiweb.com/assets/images/services/scandipwa/ScandiPWA-logo.png';

export class MetaContainer extends PureComponent {
    static propTypes = {
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        header_logo_src: PropTypes.string,
        default_title: PropTypes.string,
        canonical_url: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        description: PropTypes.string,
        imageHeight: PropTypes.number,
        imageWidth: PropTypes.number,
        keywords: PropTypes.string,
        imageSrc: PropTypes.string,
        imageAlt: PropTypes.string,
        base_url: PropTypes.string,
        pathname: PropTypes.string,
        logo_alt: PropTypes.string,
        title: PropTypes.string
    };

    static defaultProps = {
        imageHeight: SWPWA_LOGO_HEIGHT,
        imageWidth: SWPWA_LOGO_WIDTH,
        default_description: '',
        default_keywords: '',
        header_logo_src: '',
        default_title: '',
        canonical_url: '',
        title_prefix: '',
        title_suffix: '',
        description: '',
        keywords: '',
        imageSrc: '',
        imageAlt: '',
        base_url: '',
        pathname: '',
        logo_alt: '',
        title: ''
    };

    containerProps = () => ({
        metadata: this._getMeta()
    });

    _generateMetaFromMetadata(metadata, param = 'name') {
        return Object.entries(metadata).reduce((acc, [key, value]) => (
            value
                ? [...acc, { [param]: key, content: `${value}` }]
                : acc
        ), []);
    }

    _getTitle() {
        const { title, default_title } = this.props;

        return title || default_title;
    }

    _getDescription() {
        const { description, default_description } = this.props;

        return description || default_description;
    }

    _getKeywords() {
        const { keywords, default_keywords } = this.props;

        return keywords || default_keywords;
    }

    _getImageOgObject(imageSrc, imageAlt, imageWidth = null, imageHeight = null) {
        const baseMeta = {
            'og:image': imageSrc,
            'og:image:alt': imageAlt
        };

        if (!imageWidth || !imageHeight) return baseMeta;

        return {
            ...baseMeta,
            'og:image:width': imageWidth,
            'og:image:height': imageHeight
        };
    }

    _getImageOgTags() {
        const {
            header_logo_src,
            imageHeight,
            imageWidth,
            imageSrc,
            logo_alt,
            imageAlt
        } = this.props;

        const alt = imageAlt || logo_alt;

        if (imageSrc) return this._getImageOgObject(imageSrc, alt, imageWidth, imageHeight);

        return header_logo_src
            ? this._getImageOgObject(media(header_logo_src, LOGO_MEDIA), logo_alt, null, null)
            : this._getImageOgObject(SWPWA_LOGO_URL, alt, SWPWA_LOGO_WIDTH, SWPWA_LOGO_HEIGHT);
    }

    _getUrl() {
        const { base_url, canonical_url, pathname } = this.props;

        return canonical_url || `${ base_url }${ pathname ? pathname.substr(1) : '' }`;
    }

    _getMetadata() {
        const meta = {
            title: this._getTitle(),
            description: this._getDescription(),
            keywords: this._getKeywords()
        };

        return this._generateMetaFromMetadata(meta);
    }

    _getOgMetadata() {
        const ogMeta = {
            'og:type': 'website',
            'og:title': this._getTitle(),
            'og:description': this._getDescription(),
            'og:url': this._getUrl(),
            ...this._getImageOgTags()
        };

        return this._generateMetaFromMetadata(ogMeta, 'property');
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
