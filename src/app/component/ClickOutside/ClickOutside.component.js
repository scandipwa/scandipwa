/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ClickOutside extends PureComponent {
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

    handleClick({ target }) {
        const { onClick } = this.props;

        if (this.childrenRefs.every(
            ({ current }) => !current.contains(target)
        )) {
            onClick();
        }
    }

    render() {
        const { children } = this.props;

        return React.Children.map(children, (element, idx) => (
            React.cloneElement(element, { ref: this.childrenRefs[idx] })
        ));
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
