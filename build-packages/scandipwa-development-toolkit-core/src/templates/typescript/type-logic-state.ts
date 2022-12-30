export interface PlaceholderContainerMapStateProps {}

export interface PlaceholderContainerMapDispatchProps {}

export interface PlaceholderContainerBaseProps {}

export interface PlaceholderContainerFunctions {}

export type PlaceholderContainerProps = PlaceholderContainerMapStateProps
& PlaceholderContainerMapDispatchProps
& PlaceholderContainerBaseProps;

export interface PlaceholderComponentProps extends PlaceholderContainerFunctions {}

export type PlaceholderContainerPropsKeys = '';
