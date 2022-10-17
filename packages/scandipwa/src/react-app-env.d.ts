/// <reference types="react-scripts" />
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

declare module 'html-react-parser/lib/attributes-to-props' {
    export default function attributesToProps(
        attributes: Record<string, string | number>
    ): Record<string, string | number>;
}

declare module 'react-vimeo' {
    interface VimeoComponentProps {
        videoId: string;
        autoplay: boolean;
    }

    declare function VimeoComponent(props: VimeoComponentProps): JSX.Element;

    export default VimeoComponent;
}
