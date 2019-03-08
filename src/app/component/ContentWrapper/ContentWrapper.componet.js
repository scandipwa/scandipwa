import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContentWrapper.style';

/**
 * Content Wrapper
 * @class ContentWrapper
 */
class ContentWrapper extends Component {
    render() {
        const {
            children, mix, wrapperMix, label
        } = this.props;
        return (
            <section mix={ mix } aria-label={ label }>
                <div block="ContentWrapper" mix={ wrapperMix }>
                    { children }
                </div>
            </section>
        );
    }
}

ContentWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string
    }),
    wrapperMix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string
    }),
    label: PropTypes.string.isRequired
};

ContentWrapper.defaultProps = {
    mix: {},
    wrapperMix: {},
    children: null
};

export default ContentWrapper;
