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

import { PureComponent } from 'react';

import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import { FieldReactEvents } from 'Component/Field/Field.type';
import { ReactElement } from 'Type/Common.type';
import { Option } from 'Type/Field.type';
import { noopFn } from 'Util/Common';

import { FieldSelectComponentProps, FieldSelectComponentState } from './FieldSelect.type';

import './FieldSelect.style';

/**
 * Field Select
 * @class FieldSelect
 * @namespace Component/FieldSelect/Component */
export class FieldSelectComponent<
P extends Readonly<FieldSelectComponentProps> = Readonly<FieldSelectComponentProps>,
S extends FieldSelectComponentState = FieldSelectComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<FieldSelectComponentProps> = {
        isUpDirection: false,
    };

    renderNativeOption(option: Option): ReactElement {
        const {
            id,
            value,
            disabled,
            label,
            subLabel = '',
            isAvailable = true,
        } = option;

        const { isDisabled } = this.props;

        return (
            <option
              key={ id }
              id={ String(id) }
              value={ value }
              disabled={ disabled || isDisabled || !isAvailable }
            >
                { `${label} ${subLabel}` }
            </option>
        );
    }

    renderNativeSelect(): ReactElement {
        const {
            setRef,
            attr,
            events,
            isDisabled,
            options,
            handleSelectListOptionClick,
            isSelectedOptionAvailable,
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
              { ...events as FieldReactEvents<HTMLSelectElement> }
              onChange={ handleSelectListOptionClick }
            >
                { options.map(this.renderNativeOption.bind(this)) }
            </select>
        );
    }

    renderOption(option: Option): ReactElement {
        const {
            id,
            label,
            subLabel,
            isPlaceholder = false,
            isHovered,
            isAvailable = true,
        } = option;

        const {
            isExpanded,
            handleSelectListOptionClick,
        } = this.props;

        return (
            <li
              block="FieldSelect"
              elem="Option"
              mods={ {
                  isDisabled: !isAvailable,
                  isExpanded,
                  isPlaceholder,
                  isHovered,
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
              tabIndex={ isExpanded ? 0 : -1 }
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

    renderOptions(): ReactElement {
        const {
            options,
            isExpanded,
            isDropdownOpenUpwards,
            isScrollable,
        } = this.props;

        return (
            <ul
              block="FieldSelect"
              elem="Options"
              role="menu"
              mods={ {
                  isExpanded,
                  isDropdownOpenUpwards,
                  isNotScrollable: !isScrollable,
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

    renderSortSelect(): ReactElement {
        const { isSortSelect } = this.props;

        if (!isSortSelect) {
            return null;
        }

        return (
            <div block="FieldSelect" elem="SortSelect">{ __('Sort by') }</div>
        );
    }

    render(): ReactElement {
        const {
            attr: { id = '' } = {},
            isExpanded,
            handleSelectExpand,
            handleSelectListKeyPress,
            handleSelectExpandedExpand,
            isDisabled,
        } = this.props;

        return (
            <ClickOutside onClick={ handleSelectExpandedExpand }>
                <div
                  id={ `${ id }_wrapper` }
                  block="FieldSelect"
                  mods={ { isExpanded } }
                  onClick={ !isDisabled ? handleSelectExpand : noopFn }
                  onKeyPress={ !isDisabled ? handleSelectListKeyPress : noopFn }
                  role="button"
                  tabIndex={ 0 }
                  aria-label="Select dropdown"
                  aria-expanded={ isExpanded }
                >
                    <div block="FieldSelect" elem="Clickable">
                        { this.renderSortSelect() }
                        { this.renderNativeSelect() }
                        <ChevronIcon direction={ isExpanded ? Directions.TOP : Directions.BOTTOM } />
                    </div>
                    { this.renderOptions() }
                </div>
            </ClickOutside>
        );
    }
}

export default FieldSelectComponent;
