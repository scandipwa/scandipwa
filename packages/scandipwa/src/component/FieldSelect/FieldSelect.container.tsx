/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { KeyboardEvent, MouseEvent, PureComponent } from 'react';

import { KeyCode } from 'Component/Field/Keyboard.config';
import { ReactElement } from 'Type/Common.type';
import { Option } from 'Type/Field.type';

import FieldSelect from './FieldSelect.component';
import { DROPDOWN_MIN_HEIGHT, DROPDOWN_SCROLL_MIN_ITEMS } from './FieldSelect.config';
import {
    FieldSelectComponentProps,
    FieldSelectContainerFunctions,
    FieldSelectContainerProps,
    FieldSelectContainerPropsKeys,
    FieldSelectContainerState
} from './FieldSelect.type';

/**
 * Field Select
 * @class FieldSelectContainer
 * @namespace Component/FieldSelect/Container */
export class FieldSelectContainer extends PureComponent<FieldSelectContainerProps, FieldSelectContainerState> {
    static defaultProps: Partial<FieldSelectContainerProps> = {
        noPlaceholder: false,
        changeValueOnDoubleClick: false,
        isSortSelect: false
    };

    state: FieldSelectContainerState = {
        valueIndex: -1,
        searchString: '',
        selectedOptionIndex: 0,
        isExpanded: false,
        isDropdownOpenUpwards: false,
        isScrollable: false,
        isSelectedOptionAvailable: true
    };

    containerFunctions: FieldSelectContainerFunctions = {
        handleSelectExpand: this.handleSelectExpand.bind(this),
        handleSelectExpandedExpand: this.handleSelectExpandedExpand.bind(this),
        handleSelectListOptionClick: this.handleSelectListOptionClick.bind(this),
        handleSelectListKeyPress: this.handleSelectListKeyPress.bind(this),
        setRef: this.setRef.bind(this),
        handleIsScrollableList: this.handleIsScrollableList.bind(this),
        handleDropdownOpenDirection: this.handleDropdownOpenDirection.bind(this)
    };

    fieldRef: HTMLSelectElement | null = null;

    static getDerivedStateFromProps(
        props: FieldSelectContainerProps,
        state: FieldSelectContainerState
    ): { isExpanded: boolean } {
        const { attr: { isExpanded } = {} } = props;
        const { isExpanded: stateIsExpanded } = state;

        return { isExpanded: isExpanded || stateIsExpanded };
    }

    componentDidMount(): void {
        this.handleIsScrollableList();
    }

    componentDidUpdate(): void {
        const { selectedOptionIndex: prevSelectedOptionIndex } = this.state;
        const selectedOptionIndex = this.fieldRef?.options.selectedIndex;

        if (prevSelectedOptionIndex !== selectedOptionIndex) {
            this.isSelectedOptionAvailable();
        }
    }

    isSelectedOptionAvailable(): void {
        if (!this.fieldRef) {
            return;
        }

        const options = this.getOptions();
        const selectedOptionIndex = this.fieldRef.options.selectedIndex;
        const selectedOption = options[ selectedOptionIndex ];
        const isAvailable = 'isAvailable' in selectedOption ? selectedOption.isAvailable !== false : false;

        this.setState({
            selectedOptionIndex,
            isSelectedOptionAvailable: isAvailable
        });
    }

    setRef(elem: HTMLSelectElement | null): void {
        const { setRef } = this.props;
        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    getOptions(): Option[] {
        const {
            options,
            attr: {
                id = 'select',
                selectPlaceholder = __('Select item...'),
                noPlaceholder
            } = {}
        } = this.props;

        if (noPlaceholder) {
            return options;
        }

        return [
            {
                id: `${id}-placeholder`,
                name: `${id}-placeholder`,
                label: selectPlaceholder,
                value: '',
                sort_order: -100,
                isPlaceholder: true
            },
            ...options
        ];
    }

    handleSelectListOptionClick(option: Option): void {
        const { changeValueOnDoubleClick, events: { onChange } = {} } = this.props;
        const { value, target: { value: targetValue } = {} } = option;

        const fieldValue = value || targetValue || '';

        if (!this.fieldRef) {
            return;
        }

        if (changeValueOnDoubleClick) {
            this.fieldRef.value = this.fieldRef.value === value ? '' : String(fieldValue);
        } else {
            this.fieldRef.value = String(fieldValue);
        }

        if (onChange) {
            onChange(String(fieldValue));
        }
    }

    isSelectDisabled(): boolean {
        const { options } = this.props;

        return options.length === 0;
    }

    handleSelectExpand(event?: MouseEvent): void {
        if (!this.isSelectDisabled()) {
            if (!event) {
                this.setState({ isExpanded: false });
                return;
            }

            const { localName } = event.currentTarget;

            if (localName === 'ul') {
                this.setState({ isExpanded: true });
            } else {
                this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
            }
        }
        this.handleDropdownOpenDirection();
    }

    handleSelectExpandedExpand(): void {
        const { isExpanded } = this.state;

        if (isExpanded) {
            this.handleSelectExpand();
        }
    }

    _getSelectedValueIndex(keyCode: number): { searchString?: string; valueIndex?: number } {
        const { options } = this.props;
        const {
            searchString: prevSearchString,
            valueIndex: prevValueIndex
        } = this.state;

        const pressedKeyValue = String.fromCharCode(keyCode).toLowerCase();

        const searchString = (prevSearchString[ prevSearchString.length - 1 ] !== pressedKeyValue)
            ? `${prevSearchString}${pressedKeyValue}`
            : pressedKeyValue;

        const nextValueIndex = options.findIndex(({ label }, i) => (
            typeof label === 'string' && label.toLowerCase().startsWith(searchString) && (
                i > prevValueIndex || prevSearchString !== searchString
            )
        ));

        if (nextValueIndex !== -1) {
            return { searchString, valueIndex: nextValueIndex };
        }

        // if no items were found, take only the latest letter of the search string
        const newSearchString = searchString[ searchString.length - 1 ];

        const newValueIndex = options.findIndex(({ label }) => (
            typeof label === 'string' && label.toLowerCase().startsWith(newSearchString)
        ));

        if (newValueIndex !== -1) {
            return { searchString: newSearchString, valueIndex: newValueIndex };
        }

        // if there are no items starting with this letter
        return {};
    }

    handleSelectListKeyPress(event: KeyboardEvent): void {
        const { isExpanded } = this.state;
        const {
            options,
            events: { onChange } = {}
        } = this.props;
        const keyCode = event.which || event.keyCode;

        // on Enter pressed
        if (keyCode === KeyCode.ENTER) {
            this.handleSelectExpand();

            return;
        }

        if (!isExpanded
            || !keyCode
            || keyCode < KeyCode.A
            || keyCode > KeyCode.z
            || (keyCode > KeyCode.Z && keyCode < KeyCode.a)
        ) {
            return;
        }

        const { searchString, valueIndex } = this._getSelectedValueIndex(keyCode);

        // valueIndex can be 0, so !valueIndex === true
        if (!searchString || valueIndex === null || !valueIndex) {
            return;
        }

        this.updateValue(valueIndex);

        this.setState({ searchString, valueIndex }, () => {
            const { id, value } = options[ valueIndex ];

            // converting to string for avoiding the error with the first select option
            if (onChange && value) {
                onChange(value.toString());
            }

            const selectedElement = document.getElementById(`o${id}`);

            if (selectedElement) {
                selectedElement.focus();
            }
        });
    }

    updateValue(valueIndex: number): void {
        if (this.fieldRef) {
            const { options } = this.props;
            const { value } = options[ valueIndex ];

            if (value) {
                this.fieldRef.value = String(value);
            }
        }
    }

    handleDropdownOpenDirection(): void {
        if (!this.fieldRef) {
            return;
        }

        const windowHeight = document.documentElement.clientHeight;
        const rect = this.fieldRef.getBoundingClientRect();
        const bottomPosition = Math.round(windowHeight - rect.bottom);

        if (bottomPosition < DROPDOWN_MIN_HEIGHT) {
            this.setState({ isDropdownOpenUpwards: true });
        } else {
            this.setState({ isDropdownOpenUpwards: false });
        }
    }

    handleIsScrollableList(): void {
        const options = this.getOptions();

        if (options.length > DROPDOWN_SCROLL_MIN_ITEMS) {
            this.setState({ isScrollable: true });
        } else {
            this.setState({ isScrollable: false });
        }
    }

    containerProps(): Pick<FieldSelectComponentProps, FieldSelectContainerPropsKeys> {
        const {
            attr: {
                noPlaceholder,
                selectPlaceholder,
                ...attr
            } = {},
            events,
            setRef,
            isDisabled,
            isSortSelect
        } = this.props;

        const {
            isExpanded,
            isDropdownOpenUpwards,
            isScrollable,
            isSelectedOptionAvailable
        } = this.state;

        return {
            attr,
            events,
            setRef,
            isDisabled,
            isExpanded,
            isDropdownOpenUpwards,
            isScrollable,
            isSortSelect,
            isSelectedOptionAvailable,
            options: this.getOptions()
        };
    }

    render(): ReactElement {
        return (
            <FieldSelect
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldSelectContainer;
