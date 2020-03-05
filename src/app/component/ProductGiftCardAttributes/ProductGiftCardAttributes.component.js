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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MixType } from 'Type/Common';
import { getGiftCardIndex } from 'Util/Product';
import Field from 'Component/Field/Field.container';

import './ProductGiftCardAttributes.style';

export default class ProductGiftCardAttributes extends PureComponent {
    static propTypes = {
        updateGiftCardAmount: PropTypes.func.isRequired,
        numberOfPlaceholders: PropTypes.array.isRequired,
        isReady: PropTypes.bool,
        mix: MixType,
        mods: PropTypes.object.isRequired,
        giftcard_amounts: PropTypes.array,
        openAmountValues: PropTypes.object.isRequired,
        giftCardAmount: PropTypes.number.isRequired
    };

    static defaultProps = {
        isReady: true,
        mix: {},
        giftcard_amounts: []
    };

    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            setActiveOption: true
        };
    }

    componentDidUpdate() {
        const { openAmountValues, giftCardAmount } = this.props;
        const { setActiveOption } = this.state;

        if (Object.keys(openAmountValues).length < 2 && setActiveOption && giftCardAmount > 0) {
            this.setActiveIndex(giftCardAmount);
        }
    }

    setActiveIndex(value) {
        const { updateGiftCardAmount, giftcard_amounts } = this.props;

        if (giftcard_amounts.length <= 2) return null;

        const giftCardIndex = getGiftCardIndex(value, giftcard_amounts, 'value');
        const id = giftcard_amounts[giftCardIndex].value_id;

        this.setState({ selected: id, setActiveOption: false }, () => {
            updateGiftCardAmount(value, giftCardIndex);
        });
    }

    setActiveOnClick(id, value) {
        const { updateGiftCardAmount, giftcard_amounts } = this.props;
        const giftCardIndex = getGiftCardIndex(value, giftcard_amounts, 'value');

        this.setState({ selected: id }, () => {
            updateGiftCardAmount(value, giftCardIndex);
        });
    }

    renderGiftCardAttributeValue(value, id) {
        const { selected } = this.state;
        const isActive = selected === id;
        const mods = { isSelected: isActive };

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              block="ProductAttributeValue"
              elem="String"
              id={ id }
              mods={ mods }
              role="button"
              tabIndex="0"
              onClick={ () => this.setActiveOnClick(id, value) }
            >
                { value }
            </div>
        );
    }

    renderCustomValueSelector(openAmountValues) {
        const { updateGiftCardAmount, giftCardAmount } = this.props;
        const { open_amount_min, open_amount_max } = openAmountValues;

        return (
            <Field
              id="giftCardValue"
              name="giftCardValue"
              type="number"
              min={ open_amount_min }
              max={ open_amount_max }
              value={ giftCardAmount }
              onChange={ updateGiftCardAmount }
            />
        );
    }

    renderOptions(option) {
        const { value, value_id } = option;

        return (
            <div
              block="ProductGiftCardAttributes"
              elem="OptionsList"
            >
                { this.renderGiftCardAttributeValue(value, value_id) }
            </div>
        );
    }

    renderPlaceholders() {
        const { numberOfPlaceholders } = this.props;

        return numberOfPlaceholders.map((length, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={ i }
              block="ProductGiftCardAttributes"
              elem="OptionsList"
            >
                { Array.from({ length }, (_, i) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={ i }
                      block="ProductGiftCardAttributes"
                      elem="Placeholder"
                    />
                )) }
            </div>
        ));
    }

    renderGiftCardOptions() {
        const { giftcard_amounts, openAmountValues } = this.props;

        if (Object.keys(openAmountValues).length > 2) {
            return this.renderCustomValueSelector(openAmountValues);
        }

        return Object.values(giftcard_amounts).map((option) => {
            const { value_id } = option;

            return (
                <div
                  key={ value_id }
                  block="ProductGiftCardAttributes"
                >
                    { this.renderOptions(option) }
                </div>
            );
        });
    }

    render() {
        const { isReady, mix, mods } = this.props;

        return (
            <div block="ProductGiftCardAttributes" mix={ mix } mods={ mods }>
                { isReady ? this.renderGiftCardOptions() : this.renderPlaceholders() }
            </div>
        );
    }
}
