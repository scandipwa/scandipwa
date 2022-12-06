import { PureComponent } from 'react';

import { PlaceholderComponentProps } from './Placeholder.type';

import './Placeholder.style';

export class Placeholder extends PureComponent<PlaceholderComponentProps> {
    render() {
        return (
            <div block="Placeholder">
                { /* TODO: Implement render method */ }
            </div>
        );
    }
}

export default Placeholder;
