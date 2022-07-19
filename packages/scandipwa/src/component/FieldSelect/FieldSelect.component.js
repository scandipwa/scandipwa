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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ChevronIcon from 'Component/ChevronIcon';
import { BOTTOM, TOP } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import { EventsType, FieldAttrType, FieldOptionsType } from 'Type/Field.type';

import './FieldSelect.style';

/**
 * Field Select
 * @class FieldSelect
 * @namespace Component/FieldSelect/Component */
export class FieldSelect extends PureComponent {
    static propTypes = {
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        options: FieldOptionsType.isRequired,
        setRef: PropTypes.func.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        handleSelectListOptionClick: PropTypes.func.isRequired,
        handleSelectListKeyPress: PropTypes.func.isRequired,
        handleSelectExpandedExpand: PropTypes.func.isRequired,
        handleSelectExpand: PropTypes.func.isRequired,
        isSelectedOptionAvailable: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        isDropdownOpenUpwards: PropTypes.bool.isRequired,
        isScrollable: PropTypes.bool.isRequired,
        isSortSelect: PropTypes.bool.isRequired,
        isUpDirection: PropTypes.bool
    };

    static defaultProps = {
        isUpDirection: false
    };

    renderNativeOption(option) {
        const {
            id,
            value,
            disabled,
            label,
            subLabel = '',
            isAvailable = true,
            isPlaceholder
        } = option;

        const { isDisabled } = this.props;

        return (
            <option
              key={ id }
              id={ id }
              value={ value }
              disabled={ disabled || isDisabled || !isAvailable }
              selected={ isPlaceholder }
            >
                { `${label} ${subLabel}` }
            </option>
        );
    }

    renderNativeSelect() {
        const {
            setRef, attr, events, isDisabled, options, handleSelectListOptionClick, isSelectedOptionAvailable
        } = this.props;

        return (
            <select
              block="FieldSelect"
              elem="Select"
              mods={ { isDisabled: !isSelectedOptionAvailable } }
              ref={ (elem) => setRef(elem) }
              disabled={ isDisabled }
              // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
              { ...attr }
              // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
              { ...events }
              onChange={ handleSelectListOptionClick }
            >
                { options.map(this.renderNativeOption.bind(this)) }
            </select>
        );
    }

    renderOption(option) {
        const {
            id,
            label,
            subLabel,
            isPlaceholder = false,
            isHovered,
            isAvailable = true
        } = option;

        const {
            isExpanded,
            handleSelectListOptionClick
        } = this.props;

        return (
            <li
              block="FieldSelect"
              elem="Option"
              mods={ {
                  isDisabled: !isAvailable,
                  isExpanded,
                  isPlaceholder,
                  isHovered
              } }
              key={ id }
              /**
               * Added 'o' as querySelector does not work with
               * ids, that consist of numbers only
               */
              id={ `o${id}` }
              role="menuitem"
              // eslint-disable-next-line react/jsx-no-bind
              onMouseDown={ () => handleSelectListOptionClick(option) }
              // eslint-disable-next-line react/jsx-no-bind
              onTouchStart={ () => handleSelectListOptionClick(option) }
              // eslint-disable-next-line react/jsx-no-bind
              onKeyPress={ () => handleSelectListOptionClick(option) }
              tabIndex={ isExpanded ? '0' : '-1' }
            >
                { label }
                { subLabel && (
                    <strong>
                        { ` ${subLabel}` }
                    </strong>
                ) }
            </li>
        );
    }

    renderOptions() {
        const {
            options,
            isExpanded,
            isDropdownOpenUpwards,
            isScrollable
        } = this.props;

        return (
            <ul
              block="FieldSelect"
              elem="Options"
              role="menu"
              mods={ {
                  isExpanded,
                  isDropdownOpenUpwards,
                  isNotScrollable: !isScrollable
              } }
            >
                <div
                  block="FieldSelect"
                  elem="OptionsWrapper"
                  role="menu"
                  mods={ { isExpanded } }
                >
                    { options.map(this.renderOption.bind(this)) }
                </div>
            </ul>
        );
    }

    renderSortSelect() {
        const { isSortSelect } = this.props;

        if (!isSortSelect) {
            return null;
        }

        return (
            <div block="FieldSelect" elem="SortSelect">{ __('Sort by') }</div>
        );
    }

    render() {
        const {
            attr: { id = '' } = {},
            isExpanded,
            handleSelectExpand,
            handleSelectListKeyPress,
            handleSelectExpandedExpand,
            isDisabled
        } = this.props;

        return (
            <ClickOutside onClick={ handleSelectExpandedExpand }>
                <div
                  id={ `${ id }_wrapper` }
                  block="FieldSelect"
                  mods={ { isExpanded } }
                  onClick={ !isDisabled && handleSelectExpand }
                  onKeyPress={ !isDisabled && handleSelectListKeyPress }
                  role="button"
                  tabIndex="0"
                  aria-label="Select dropdown"
                  aria-expanded={ isExpanded }
                >
                    <div block="FieldSelect" elem="Clickable">
                        { this.renderSortSelect() }
                        { this.renderNativeSelect() }
                        <ChevronIcon direction={ isExpanded ? TOP : BOTTOM } />
                    </div>
                    { this.renderOptions() }
                </div>
            </ClickOutside>
        );
    }
}

export default FieldSelect;
