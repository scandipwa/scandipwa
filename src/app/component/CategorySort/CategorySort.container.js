import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CategorySort from './CategorySort.component';

export class CategorySortContainer extends PureComponent {
    static propTypes = {
        sortFields: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string,
                label: PropTypes.string
            }))
        ])
    };

    static defaultProps = {
        sortFields: []
    };

    containerProps = () => ({
        selectOptions: this._prepareOptions()
    })

    _prepareOptions() {
        const { sortFields } = this.props;

        if (!sortFields) return [];

        const selectOptions = sortFields.reduce((acc, option) => {
            const { id, label } = option;
            let ascLabel = label.split(' ')[0];
            let descLabel = label.split(' ')[0];

            switch (id) {
            case 'price':
                ascLabel += __(': Low to High');
                descLabel += __(': High to Low');
                break;
            case 'name':
                ascLabel += __(': A to Z');
                descLabel += __(': Z to A');
                break;
            case 'size':
            case 'position':
            default:
                return acc;
            }

            const ascOption = {
                id: `ASC ${id}`,
                name: id,
                value: `ASC ${id}`,
                label: ascLabel
            };

            const descOption = {
                id: `DESC ${id}`,
                name: id,
                value: `DESC ${id}`,
                label: descLabel
            };

            return [...acc, ascOption, descOption];
        }, []);

        return selectOptions;
    }

    render() {
        return (
            <CategorySort
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default CategorySortContainer;
