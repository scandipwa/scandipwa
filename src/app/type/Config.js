import PropTypes from 'prop-types';

export const regionType = PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number
});

export const countriesType = PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.string,
        available_regions: PropTypes.arrayOf(regionType)
    })
);
