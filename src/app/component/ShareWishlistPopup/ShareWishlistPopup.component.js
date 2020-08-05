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
import Popup from 'Component/Popup';
import ShareWishlistForm from 'Component/ShareWishlistForm';

import './ShareWishlistPopup.style';

export const SHARE_WISHLIST_POPUP_ID = 'ShareWishlistPopup';

export default class ShareWishlistPopup extends PureComponent {
    state = {};

    static propTypes = {
        handleFormData: PropTypes.func.isRequired
    };

    renderContent() {
        const { handleFormData } = this.props;
        return <ShareWishlistForm onSave={ handleFormData } />;
    }

    render() {
        return (
            <Popup
              id={ SHARE_WISHLIST_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'ShareWishlistPopup' } }
            >
                { this.renderContent() }
            </Popup>
        );
    }
}
