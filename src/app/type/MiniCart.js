import PropTypes from 'prop-types';

export const PageType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string
});

export const QuantitySelectorType = PropTypes.shape({
    increase: PropTypes.func,
    decrease: PropTypes.func,
    quantity: PropTypes.number
});

export const TotalsType = PropTypes.shape({
    count: PropTypes.number,
    subTotalPrice: PropTypes.string,
    taxPrice: PropTypes.string,
    grandTotalPrice: PropTypes.string
});
