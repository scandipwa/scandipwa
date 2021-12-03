import PropTypes from 'prop-types';

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
    hash: PropTypes.string,
    key: PropTypes.string
});

export const HistoryType = PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: LocationType
});

export const MatchType = PropTypes.shape({
    path: PropTypes.string
});
