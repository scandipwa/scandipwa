import { Children, Mix, Mods } from 'Type/Common.type';

export interface ButtonComponentProps {
    onClick: any;
    disabled: boolean;
    type: "button" | "submit";
    children: Children;
    mix: Mix;
    ariaLabel: string;
    'aria-label': string;
    block: string;
    elem: string;
    mods: Mods;
    id: string | number;
    name: string;
};

export type ButtonContainerPropsKey =
    'disabled'
    | 'aria-label'
    | 'mix'
    | 'type'
    | 'onClick'
    | 'id'
    | 'name';
