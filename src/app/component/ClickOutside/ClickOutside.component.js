import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClickOutside extends Component {
    constructor(props) {
        super(props);

        const { children } = this.props;

        this.childrenRefs = React.Children.map(
            children,
            () => React.createRef()
        );

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(e) {
        const { onClick } = this.props;

        const isOutside = this.childrenRefs.every(
            ref => !ref.current.contains(e.target)
        );

        if (isOutside) onClick();
    };

    render() {
        const { children } = this.props;

        return React.Children.map(children, (element, idx) => React.cloneElement(element, {
            ref: this.childrenRefs[idx]
        }));
    }
}

ClickOutside.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

ClickOutside.defaultProps = {
    onClick: () => {},
    children: []
};

export default ClickOutside;
