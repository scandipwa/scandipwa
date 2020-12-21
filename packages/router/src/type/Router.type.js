import PropTypes from 'prop-types';

export const HistoryType = PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object,
    push: PropTypes.func
});

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object
});

export const MatchType = PropTypes.shape({
    path: PropTypes.string
});

export const toType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
]);
