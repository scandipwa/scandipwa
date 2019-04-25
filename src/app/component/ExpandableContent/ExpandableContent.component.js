import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ExpandableContent.style';

class ExpandableContent extends Component {
    constructor(props) {
        super(props);

        this.state = { isContentExpanded: false };

        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        const { isContentExpanded } = this.state;
        this.setState({ isContentExpanded: !isContentExpanded });
    }

    render() {
        const { isContentExpanded } = this.state;
        const { heading, subHeading, children } = this.props;

        return (
            <article block="ExpandableContent">
                <button
                  block="ExpandableContent"
                  elem="Button"
                  mods={ { isContentExpanded } }
                  onClick={ this.toggleExpand }
                >
                    <span block="ExpandableContent" elem="Heading">{ heading }</span>
                    <span block="ExpandableContent" elem="SubHeading">{ subHeading }</span>
                </button>
                <div block="ExpandableContent" elem="Content" mods={ { isContentExpanded } }>
                    { children }
                </div>
            </article>
        );
    }
}

ExpandableContent.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

ExpandableContent.defaultProps = {
    heading: '',
    subHeading: '',
    children: []
};

export default ExpandableContent;
