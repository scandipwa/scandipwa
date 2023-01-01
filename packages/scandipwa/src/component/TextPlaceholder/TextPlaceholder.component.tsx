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

import { ReactElement } from 'Type/Common.type';

import { TextPlaceHolderLength } from './TextPlaceholder.config';
import { TextPlaceholderComponentProps } from './TextPlaceholder.type';

import './TextPlaceholder.style';

/**
 * Text placeholder
 * @class TextPlaceholder
 * @namespace Component/TextPlaceholder/Component
 */
export class TextPlaceholderComponent<
P extends Readonly<TextPlaceholderComponentProps> = Readonly<TextPlaceholderComponentProps>,
S extends TextPlaceholderComponentState = TextPlaceholderComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<TextPlaceholderComponentProps> = {
        content: '',
        length: TextPlaceHolderLength.SHORT,
        mix: {},
    };

    render(): ReactElement {
        const { content, length, mix } = this.props;

        if (content) {
            return content;
        }

        return <span mix={ mix } block="TextPlaceholder" mods={ { length } } />;
    }
}

export default TextPlaceholderComponent;
