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
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from 'Component/Image';
import Figure from 'Component/Figure';

/**
 * Html content parser
 * Component converts HTML strings to React components
 * @class Html
 */
class Html extends Component {
    constructor(props) {
        super(props);

        this.rules = [
            {
                query: { name: ['a'] },
                replace: this.replaceLinks
            },
            {
                query: { name: ['figure'] },
                replace: this.replaceFigure
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

        this.parserOptions = {
            replace: (domNode) => {
                for (let i = 0; i < this.rules.length; i++) {
                    const { query, replace } = this.rules[i];

                    if (query.name && domNode.name && query.name.indexOf(domNode.name) !== -1) {
                        return replace.call(this, domNode);
                    } if (query.attribs && domNode.attribs) {
                        query.attribs.forEach((attrib) => {
                            if (typeof attrib === 'object') {
                                const queryAttrib = Object.keys(attrib)[0];
                                if (Object.prototype.hasOwnProperty.call(domNode.attribs, queryAttrib)) {
                                    const match = domNode.attribs[queryAttrib].match(Object.values(attrib)[0]);
                                    if (match) return replace.call(this, domNode);
                                }
                            } else if (Object.prototype.hasOwnProperty.call(domNode.attribs, attrib)) {
                                return replace.call(this, domNode);
                            }
                        });
                    }
                }
            }
        };
    }

    /**
     * Replace links to native React Router links
     * @param  {{ attribs: Object, children: Array }}
     * @return {void|JSX} Return JSX if link is allowed to be replaced
     * @memberof Html
     */
    replaceLinks({ attribs, children }) {
        const { href } = attribs;
        if (href) {
            const isAbsoluteUrl = value => new RegExp('^(?:[a-z]+:)?//', 'i').test(value);
            const isSpecialLink = value => new RegExp('^(sms|tel|mailto):', 'i').test(value);
            
            if (!isAbsoluteUrl(attribs.href) && !isSpecialLink(attribs.href)) {
                /* eslint no-param-reassign: 0 */
                // Allowed, because param is not a direct reference
                attribs.to = attribs.href;
                delete attribs.href;

                return (
                    <Link { ...attributesToProps(attribs) }>
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
        if (Object.prototype.hasOwnProperty.call(attribs, 'src')) {
            return (
                <Image
                  { ...attributesToProps(attribs) }
                  showGreyPlaceholder
                  arePlaceholdersShown
                />
            );
        }
    }

    /**
     * Replace figure to Figure component
     * @param  {{ children: Array }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceFigure({ children }) {
        const newChildren = [];
        let imageSource;
        let placeHolderSource;
        let imageAlt;

        children.forEach((element) => {
            if (element.name === 'img') {
                imageSource = element.attribs.src.charAt(0) === '/' ? element.attribs.src : `/${ element.attribs.src }`;
                placeHolderSource = imageSource.replace(/\.jpg/g, '.svg');
                imageAlt = element.attribs.alt;
            } else {
                newChildren.push(element);
            }
        });

        if (imageSource) {
            return (
                // TODO temporary solution
                <Figure
                  placeholderSrc={ `/media/svg/wysiwyg/cms${ placeHolderSource }` }
                  src={ `/media/wysiwyg/cms${ imageSource }` }
                  alt={ imageAlt }
                  arePlaceholdersShown
                  showGreyPlaceholder
                >
                    { domToReact(newChildren, this.parserOptions) }
                </Figure>
            );
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

        return (
            <>
                { Parser(content, this.parserOptions) }
            </>
        );
    }
}

Html.propTypes = {
    content: PropTypes.string.isRequired
};

export default Html;
