import React, { PureComponent } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckboxComponentProps } from './Checkbox.type';

export class CheckboxComponent extends PureComponent<
    CheckboxComponentProps
> {
    static defaultProps: Partial<CheckboxComponentProps> = {
        label: '',
        id: '',
        isDisabled: false,
        onCheckedChange: () => {},
        checked: false
    };

    render() {
        const { label, id, isDisabled, onCheckedChange, checked } = this.props;
        const elem = ('checkbox').charAt(0).toUpperCase() + ('checkbox').slice(1);
        return (
            <div block="Field" elem="Wrapper" mods={{ type: "checkbox"}}>
                <div
                block="Field"
                mods={ {
                    type: "checkbox",
                    isValid: true,
                    hasError: false,
                } }
                >
                    <label htmlFor={ id } block="Field" elem={ `${elem}Label` } mods={ { isDisabled } }>
                        <Checkbox.Root id={ id } disabled={ isDisabled } onCheckedChange={ onCheckedChange } checked={checked}>
                        <Checkbox.Indicator>
                        </Checkbox.Indicator>
                        </Checkbox.Root>
                        <div block="input-control" mods={ { disabled: { isDisabled } } } />
                        { label }
                    </label>
                </div>
            </div>
        );
    }
}

export default CheckboxComponent;
