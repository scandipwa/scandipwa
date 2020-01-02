import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Input.style';

class Input extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    constructor(props){
        super(props);
    }

    render() {
        console.log(this.props.value);
        return (
            <input
                { ...this.props }
            />
        );
    }
}

export default Input;
