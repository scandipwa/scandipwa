import PropTypes from 'prop-types';

export const HistoryType = PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.shape({}),
    push: PropTypes.func
});

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.shape({})
});

export const MatchType = PropTypes.shape({
    path: PropTypes.string
});

export const toType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})
]);
