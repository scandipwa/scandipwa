import { ErrorInfo, PureComponent } from 'react';

export interface ErrorCatcherProps {
    children({ error, errorInfo }: { error?: Error, errorInfo?: ErrorInfo }): React.ReactNode
}

export class ErrorCatcher extends PureComponent<ErrorCatcherProps> {
    state = {
        error: undefined,
        errorInfo: undefined
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error, errorInfo });
    }

    render(): React.ReactNode {
        const { children } = this.props;
        const { error, errorInfo } = this.state;
        return children({ error, errorInfo });
    }
}
