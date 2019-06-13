import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorySearch extends Component {
    constructor(props) {
        super(props);
        this.state = { value: decodeURIComponent(props.value) };
    }

    componentDidUpdate(prevProps) {
        const { value: prevValue } = prevProps;
        const { value } = this.props;

        if (prevValue !== value) this.setState({ value });
    }

    onChange(e) {
        const { value } = e.target;
        const { onChange } = this.props;
        this.setState({ value });

        clearTimeout(this.timeout);
        this.timeout = setTimeout(onChange, 500, value);
    }

    render() {
        const { value } = this.state;
        return (
            <input
              value={ value }
              onChange={ e => this.onChange(e) }
              placeholder="I'm looking for..."
            />
        );
    }
}

CategorySearch.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired
};

export default CategorySearch;
