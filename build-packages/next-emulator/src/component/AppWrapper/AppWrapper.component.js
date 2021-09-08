/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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

import routes from '@scandipwa/scandipwa/pages/routes';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/** @namespace NextEmulator/Component/AppWrapper/Component/AppWrapperComponent */
export const AppWrapperComponent = ({ route }) => {
    const {
        default: Component,
        getServerSideProps,
        getStaticProps
    } = routes[route];
    const [componentProps, setComponentProps] = useState({});

    useEffect(() => {
        const fn = getServerSideProps || getStaticProps;

        if (fn) {
            // TODO pass query
            const result = fn();

            if (result instanceof Promise) {
                result.then(
                    /** @namespace NextEmulator/Component/AppWrapper/Component/then */
                    ({ props }) => setComponentProps(props)
                );
            } else {
                setComponentProps(result.props);
            }
        }
    }, []);

    return (
        <Component { ...componentProps } />
    );
};

AppWrapperComponent.propTypes = {
    route: PropTypes.string.isRequired
};

export default AppWrapperComponent;
