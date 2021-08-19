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

const mapStateToProps = (args, callback) => {
    const [state] = args;

    return {
        ...callback(...args),
        device: state.ConfigReducer.device
    };
};

export default {
    'Component/SearchOverlay/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
