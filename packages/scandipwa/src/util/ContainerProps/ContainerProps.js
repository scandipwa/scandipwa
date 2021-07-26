/* eslint-disable import/prefer-default-export */
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

export const getContainerProps = (componentOrIncludedPropsArray, ...props) => {
    const allPropsObject = props.reduce((acc, prop) => ({
        ...acc,
        ...prop
    }), {});

    const propsFilter = (prop) => Object.prototype.hasOwnProperty.call(allPropsObject, prop);
    const propsReducer = (acc, val) => ({
        ...acc,
        [val]: allPropsObject[val]
    });

    if (Array.isArray(componentOrIncludedPropsArray)) {
        return componentOrIncludedPropsArray
            .filter(propsFilter)
            .reduce(propsReducer, {});
    }

    const { propTypes: requiredComponentProps = {} } = componentOrIncludedPropsArray || {};

    return Object.keys(requiredComponentProps)
        .filter(propsFilter)
        .reduce(propsReducer, {});
};
