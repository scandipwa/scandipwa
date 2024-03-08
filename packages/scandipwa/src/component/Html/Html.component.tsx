/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable react/jsx-no-useless-fragment */
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

/* eslint-disable consistent-return */
// Disabled due `domToReact` internal logic
import parser, { DomElement, HTMLReactParserOptions } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import domToReact from 'html-react-parser/lib/dom-to-react';
import { PureComponent } from 'react';

import Image from 'Component/Image';
import Link from 'Component/Link';
import WidgetFactory from 'Component/WidgetFactory';
import { WidgetFactoryComponentProps } from 'Component/WidgetFactory/WidgetFactory.type';
import { hash } from 'Util/Request/Hash';
import { setLoadedFlag } from 'Util/Request/LowPriorityLoad';
import { AfterPriority } from 'Util/Request/LowPriorityRender';

import { HtmlComponentProps, HtmlParserRule } from './Html.type';

// Used to load LCP elements as high priority
export const HIGH_PRIORITY_ELEMENTS = ['widget', 'img'];

/**
 * Html content parser
 * Component converts HTML strings to React components
 * @class Html
 * @namespace Component/Html/Component
 */
export class HtmlComponent extends PureComponent<HtmlComponentProps> {
    createdOutsideElements: Record<number, boolean> = {};

    rules: HtmlParserRule[] = [
        {
            query: { name: ['widget'] },
            replace: this.replaceWidget,
        },
        {
            query: { name: ['a'] },
            replace: this.replaceLinks,
        },
        {
            query: { name: ['img'] },
            replace: this.replaceImages,
        },
        {
            query: { name: ['input'] },
            replace: this.replaceInput,
        },
        {
            query: { name: ['script'] },
            replace: this.replaceScript,
        },
        {
            query: { name: ['style'] },
            replace: this.replaceStyle,
        },
        {
            query: { name: ['table'] },
            replace: this.wrapTable,
        },
        {
            query: { name: ['div'] },
            replace: this.replaceDiv,
        },
    ];

    isPriorityLoading: boolean = false;

    lastBlock: DomElement = null;

    parserOptions: HTMLReactParserOptions = {
        // eslint-disable-next-line react/no-unstable-nested-components
        replace: (domNode: DomElement): JSX.Element | undefined => {
            const {
                data,
                name: domName,
                attribs: domAttrs,
                parent,
                next,
                children = [],
            } = domNode;

            if (!parent && !next && !this.lastBlock) {
                if (children.length) {
                    this.lastBlock = this.getLastRenderElement(children[children.length - 1]);
                } else {
                    this.lastBlock = this.getLastRenderElement(domNode);
                }
            }

            if (this.lastBlock === domNode && !this.isPriorityLoading) {
                setLoadedFlag();
            }

            // Let's remove empty text nodes
            if (data && !data.replace(/\u21b5/g, '').replace(/\s/g, '').length) {
                return <></>;
            }

            const rule = this.rules.find((rule) => {
                const { query: { name, attribs = [] } } = rule;

                if (name && domName && name.indexOf(domName) !== -1) {
                    return true;
                }

                if (attribs && domAttrs) {
                    // eslint-disable-next-line fp/no-loops, fp/no-let
                    for (let i = 0; i < attribs.length; i++) {
                        const attrib = attribs[i];

                        if (typeof attrib === 'object') {
                            const queryAttrib = Object.keys(attrib)[0];

                            if (Object.prototype.hasOwnProperty.call(domAttrs, queryAttrib)) {
                                return domAttrs[queryAttrib].match(Object.values(attrib)[0]);
                            }
                        } else if (Object.prototype.hasOwnProperty.call(domAttrs, attrib)) {
                            return true;
                        }
                    }
                }

                return false;
            });

            if (rule) {
                const { replace } = rule;

                if (this.isPriorityLoading) {
                    return (
                        <AfterPriority fallback={ <div style={ { height: '100vh' } } /> }>
                            { replace.call(this, domNode) }
                        </AfterPriority>
                    );
                }

                if (rule.query.name.some((name) => HIGH_PRIORITY_ELEMENTS.includes(name)) && !this.isPriorityLoading) {
                    this.isPriorityLoading = true;
                }

                return replace.call(this, domNode);
            }
        },
    };

    __construct(props: HtmlComponentProps) {
        super.__construct?.(props);
    }

    getLastRenderElement(lastChildren: DomElement): DomElement {
        const { children = [] } = lastChildren;

        if (children.length) {
            return this.getLastRenderElement(children[children.length - 1]);
        }

        return lastChildren;
    }

    attributesToProps(attribs: Record<string, string | number>): Record<string, string | number> {
        const toCamelCase = (str: string) => str.replace(/_[a-z]/g, (match: string) => match.substr(1).toUpperCase());

        const convertPropertiesToValidFormat = (
            properties: Record<string, string | number>,
        ) => Object.entries(properties)
            .reduce((validProps, [key, value]) => {
                // eslint-disable-next-line no-restricted-globals
                if (!isNaN(+value)) {
                    return { ...validProps, [toCamelCase(key)]: +value };
                }

                return { ...validProps, [toCamelCase(key)]: value };
            }, {});

        const properties = convertPropertiesToValidFormat(attribs);

        return attributesToProps(properties);
    }

    scrollToTopFunction(): void {
        document.documentElement.scrollIntoView();
    }

    /**
     * Replace links to native React Router links
     * @param  {{ attribs: Object, children: Array }}
     * @return {void|JSX} Return JSX if link is allowed to be replaced
     * @memberof Html
     */
    replaceLinks({ attribs, children }: DomElement): JSX.Element {
        const { href, ...attrs } = attribs;

        if (href) {
            const isAbsoluteUrl = (value: string) => /^(?:[a-z]+:)?\/\//i.test(value);
            const isSpecialLink = (value: string) => /^(sms|tel|mailto):/i.test(value);

            if (!isAbsoluteUrl(href) && !isSpecialLink(href)) {
                return (
                    <Link
                      onClick={ this.scrollToTopFunction }
                      { ...attributesToProps({ ...attrs, to: href }) }
                    >
                        { domToReact(children, this.parserOptions) }
                    </Link>
                );
            }
        }

        return domToReact(children, this.parserOptions) as JSX.Element;
    }

    replaceDiv({ attribs, children }: DomElement): JSX.Element {
        const dataContentType = attribs['data-content-type'] || '';

        switch (dataContentType) {
        case 'html':
            return (
                <div>
                    { children.length && children.map(({ data = '' }) => parser(data, this.parserOptions)) }
                </div>
            );

        default:
            return (
                <div { ...attribs }>
                    { domToReact(children, this.parserOptions) }
                </div>
            );
        }
    }

    /**
     * Replace img to React Images
     * @param  {{ attribs: Object }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceImages({ attribs }: DomElement): JSX.Element {
        const attributes = attributesToProps(attribs);

        if (attribs.src) {
            return <Image { ...attributes } isPlain onImageLoad={ setLoadedFlag } />;
        }

        return <></>;
    }

    /**
     * Replace input.
     * @param  {{ attribs: Object }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceInput({ attribs }: DomElement): JSX.Element {
        return <input { ...attributesToProps(attribs) } />;
    }

    /**
     * Wrap table in container
     *
     * @param attribs
     * @param children
     * @returns {*}
     */
    wrapTable({ attribs, children }: DomElement): JSX.Element {
        return (
            <div block="Table" elem="Wrapper">
                <table { ...attributesToProps(attribs) }>
                    { domToReact(children, this.parserOptions) }
                </table>
            </div>
        );
    }

    /**
     * Insert corresponding widget
     *
     * @param {{ attribs: Object }} { attribs }
     * @returns {null|JSX} Return Widget
     * @memberof Html
     */
    replaceWidget({ attribs }: DomElement): JSX.Element {
        return (
            // eslint-disable-next-line react/jsx-no-bind
            <WidgetFactory { ...this.attributesToProps(attribs) as unknown as WidgetFactoryComponentProps } onLoad={ setLoadedFlag } />
        );
    }

    replaceStyle(elem: DomElement): JSX.Element {
        const { children } = elem;
        const elemHash = hash(children[0].data);

        if (this.createdOutsideElements[elemHash]) {
            return <></>;
        }

        const style = document.createElement('style');

        if (children && children[0]) {
            style.appendChild(document.createTextNode(children[0].data));
        }

        document.head.appendChild(style);
        this.createdOutsideElements[elemHash] = true;

        return <></>;
    }

    replaceScript(elem: DomElement): JSX.Element {
        const { attribs, children } = elem;
        const { src = '' } = attribs;
        const scriptContent = children[0] ? children[0].data : '';
        const elemHash = hash(src + scriptContent);

        if (this.createdOutsideElements[elemHash]) {
            return <></>;
        }

        const script = document.createElement('script');

        Object.entries(attribs).forEach(([attr, value]) => script.setAttribute(attr, String(value || '')));

        if (children && children[0]) {
            script.appendChild(document.createTextNode(children[0].data));
        }

        if (!Number.isNaN(Number(script))) {
            document.head.appendChild(script);
        }

        this.createdOutsideElements[elemHash] = true;

        return <></>;
    }

    render(): JSX.Element | JSX.Element[] {
        const { content } = this.props;

        return parser(content, this.parserOptions);
    }
}

export default HtmlComponent;
