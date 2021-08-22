/* eslint-disable */
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
import { PureComponent } from 'react';
import CustomizableOption from 'Component/Product/CustomizableOption';

import './CustomizableOptions.style.scss';

export class CustomizableOptions extends PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        updateSelectedValues: PropTypes.func.isRequired
    };

    renderOptionGroup = (group) => {
        const { title, value, type, required, uid } = group;
        const { updateSelectedValues } = this.props;

        return (
            <CustomizableOption {
            ...{
                    uid,
                    title,
                    options: value,
                    isRequired: required,
                    type,
                    updateSelectedValues
                }
            }/>
        );
    }

    render() {
        const { options } = this.props;

        return (
          <div>
              { options.map(this.renderOptionGroup) }
          </div>
        );
    }
}

export default CustomizableOptions;
