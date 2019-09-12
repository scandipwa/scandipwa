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

/* eslint-disable consistent-return */
// Disabled due `domToReact` internal logic
import { PureComponent } from 'react';
import parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import Link from 'Component/Link';
import PropTypes from 'prop-types';
import Image from 'Component/Image';

/**
 * Html content parser
 * Component converts HTML strings to React components
 * @class Html
 */
export default class Html extends PureComponent {
    static propTypes = {
        content: PropTypes.string.isRequired
    };

    rules = [
        {
            query: { name: ['a'] },
            replace: this.replaceLinks
        },
        {
            query: { name: ['img'] },
            replace: this.replaceImages
        },
        {
            query: { name: ['input'] },
            replace: this.replaceInput
        },
        {
            query: { name: ['script'] },
            replace: this.replaceScript
        }
    ];

    parserOptions = {
        replace: (domNode) => {
            const { data, name: domName, attribs: domAttrs } = domNode;

            // Let's remove empty text nodes
            if (data && !data.replace(/\u21b5/g, '').replace(/\s/g, '').length) {
                return <></>;
            }

            const rule = this.rules.find((rule) => {
                const { query: { name, attribs } } = rule;

                if (name && domName && name.indexOf(domName) !== -1) {
                    return true;
                } if (attribs && domAttrs) {
                    attribs.forEach((attrib) => {
                        if (typeof attrib === 'object') {
                            const queryAttrib = Object.keys(attrib)[0];
                            if (Object.prototype.hasOwnProperty.call(domAttrs, queryAttrib)) {
                                return domAttrs[queryAttrib].match(Object.values(attrib)[0]);
                            }
                        } else if (Object.prototype.hasOwnProperty.call(domAttrs, attrib)) {
                            return true;
                        }
                    });
                }

                return false;
            });

            if (rule) {
                const { replace } = rule;
                return replace.call(this, domNode);
            }
        }
    };

    /**
     * Replace links to native React Router links
     * @param  {{ attribs: Object, children: Array }}
     * @return {void|JSX} Return JSX if link is allowed to be replaced
     * @memberof Html
     */
    replaceLinks({ attribs, children }) {
        const { href, ...attrs } = attribs;

        if (href) {
            const isAbsoluteUrl = value => new RegExp('^(?:[a-z]+:)?//', 'i').test(value);
            const isSpecialLink = value => new RegExp('^(sms|tel|mailto):', 'i').test(value);

            if (!isAbsoluteUrl(href) && !isSpecialLink(href)) {
                return (
                    <Link { ...attributesToProps({ ...attrs, to: href }) }>
                        { domToReact(children, this.parserOptions) }
                    </Link>
                );
            }
        }
    }

    /**
     * Replace img to React Images
     * @param  {{ attribs: Object }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceImages({ attribs }) {
        if (attribs.src) {
            return <Image { ...attributesToProps(attribs) } />;
        }
    }

    /**
     * Replace input.
     * @param  {{ attribs: Object }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceInput({ attribs }) {
        return <input { ...attributesToProps(attribs) } />;
    }

    replaceScript({ attribs }) {
        const script = document.createElement('script');
        Object.entries(attribs).forEach(([attr, value]) => script.setAttribute(attr, value));
        document.body.appendChild(script);

        return <></>;
    }

    render() {
        const { content } = this.props;
        return parser(content, this.parserOptions);
    }
}
