import { ButtonComponentProps, ButtonContainerPropsKey } from './Button.type';
import { PureComponent } from 'react';
import { ReactElement } from 'Type/Common.type';

export class ButtonContainer extends PureComponent<
    ButtonComponentProps
> {
    static defaultProps: Partial<ButtonComponentProps> = {
        onClick: () => {},
        disabled: false,
        type: "button",
        mix: {},
        ariaLabel: ''
    };

    containerProps(): Pick<ButtonComponentProps, ButtonContainerPropsKey> {
        const { onClick, type, mix, ariaLabel, disabled, id, name } = this.props;

        return {
            onClick,
            type,
            mix,
            'aria-label': ariaLabel,
            disabled,
            id,
            name
        };
    };

    render(): ReactElement {
        const { children } = this.props;

        return (
            <button
                { ...this.containerProps() }
            >
                { children }
            </button>
        );
    }
}

export default ButtonContainer;
