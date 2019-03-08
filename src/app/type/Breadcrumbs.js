import PropTypes from 'prop-types';

export const BreadcrumbType = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string
});

export const BreadcrumbsType = PropTypes.arrayOf(BreadcrumbType);
