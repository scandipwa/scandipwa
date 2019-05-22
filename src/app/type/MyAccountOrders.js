import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
    PropTypes.shape({
        id: PropTypes.number,
        created_at: PropTypes.instanceOf(Date),
        grand_total: PropTypes.number,
        status: PropTypes.string
    }),
    PropTypes.array
]);
