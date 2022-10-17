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

import { DomElement } from 'html-react-parser';

export interface HtmlComponentProps {
    content: string;
}

export interface HtmlParserRule {
    query: {
        name: string[];
        attribs?: Record<string, string>[];
    };
    replace: (elm: DomElement) => JSX.Element | undefined;
}
