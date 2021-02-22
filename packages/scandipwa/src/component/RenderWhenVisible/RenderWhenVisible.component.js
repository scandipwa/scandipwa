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
import { PureComponent } from 'react';
import { InView } from 'react-intersection-observer';

import { ChildrenType } from 'Type/Common';

import './RenderWhenVisible.style';

/** @namespace Component/RenderWhenVisible/Component */
export class RenderWhenVisible extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        fallback: PropTypes.func
    };

    static defaultProps = {
        fallback: () => {}
    };

    state = {
        wasVisible: false
    };

    __construct(props) {
        super.__construct(props);

        // a hack to determine if the element is on screen or not imidiatelly
        setTimeout(this.checkIsVisible, 0);
    }

    checkIsVisible = () => {
        if (!this.node) {
            return;
        }

        const rect = this.node.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
            this.setState({ wasVisible: true });
        }
    };

    shouldRender() {
        const { wasVisible } = this.state;
        return !wasVisible && !this.isSSR() && !this.isCrawler();
    }

    handleVisibilityToggle = (isVisible) => {
        const { wasVisible } = this.state;

        if (!wasVisible && isVisible) {
            this.setState({ wasVisible: true });
        }
    };

    isSSR() {
        return !globalThis.window || !globalThis.window.document;
    }

    isCrawler() {
        const { userAgent } = navigator;
        // eslint-disable-next-line max-len
        const re = /(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis|HeadlessChrome)/i;

        return re.test(userAgent);
    }

    renderFallback() {
        const { fallback } = this.props;
        const fallbackRender = fallback();

        if (fallbackRender) {
            return fallbackRender;
        }

        return (
            <div block="RenderWhenVisible" elem="Detector" />
        );
    }

    renderVisibilitySensor() {
        return (
            <InView onChange={ this.handleVisibilityToggle }>
                { this.renderFallback() }
            </InView>
        );
    }

    renderChildren() {
        const { children } = this.props;

        return children;
    }

    renderContent() {
        if (this.shouldRender()) {
            return this.renderVisibilitySensor();
        }

        return this.renderChildren();
    }

    render() {
        return (
            <div
              block="RenderWhenVisible"
              ref={ (node) => {
                  this.node = node;
              } }
            >
                { this.renderContent() }
            </div>
        );
    }
}

export default RenderWhenVisible;
