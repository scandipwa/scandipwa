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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSS from 'Util/CSS';
import { MixType } from 'Type/Common';
import './Swatch.style';

/**
 * Swatch component
 * @class Swatch
 */
class Swatch extends PureComponent {
    constructor(props) {
        super(props);

        this.swatchRef = React.createRef();
    }

    componentDidMount() {
        const { requestVar, filterItem: { swatch_data } } = this.props;
        if (swatch_data && requestVar === 'color') this.applyColorVariables();
    }

    applyColorVariables() {
        const { filterItem: { swatch_data: { value: baseColor } } } = this.props;

        const color = (baseColor.charAt(0) === '#') ? baseColor.substring(1, 7) : baseColor;
        const r = parseInt(color.substring(0, 2), 16); // hexToR
        const g = parseInt(color.substring(2, 4), 16); // hexToG
        const b = parseInt(color.substring(4, 6), 16); // hexToB
        const isLight = (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186);

        CSS.setVariable(this.swatchRef, 'swatch-background', baseColor);
        CSS.setVariable(this.swatchRef, 'swatch-check-mark-background', isLight ? '#000' : '#fff');
        CSS.setVariable(this.swatchRef, 'swatch-border-color', isLight ? '#000' : baseColor);
    }

    render() {
        const {
            filterItem: { label },
            requestVar,
            isSelected,
            onClick,
            mix
        } = this.props;

        const mods = { type: requestVar, isSelected };

        if (!label) {
            return (
                <div
                  block="Swatch"
                  mods={ { ...mods, isPlaceholder: true } }
                  mix={ { ...mix, mods } }
                />
            );
        }

        return (
            <button
              ref={ this.swatchRef }
              block="Swatch"
              mods={ mods }
              mix={ { ...mix, mods } }
              onClick={ () => onClick() }
            >
                { label }
            </button>
        );
    }
}

Swatch.propTypes = {
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    filterItem: PropTypes.objectOf(PropTypes.shape),
    requestVar: PropTypes.string,
    mix: MixType
};

Swatch.defaultProps = {
    isSelected: false,
    onClick: () => {},
    mix: {},
    filterItem: {},
    requestVar: 'default'
};

export default Swatch;
