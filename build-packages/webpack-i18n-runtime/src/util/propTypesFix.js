import { TranslatedValue } from './__';
/**
 * This fix is required, because:
 * typeof new String('...') === 'object'
 * typeof new TranslatedValue(...) === 'object'
 */

try {
    const PropTypes = require('prop-types');

    const validStringType = PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(TranslatedValue)
    ]);

    PropTypes.string = validStringType;
} catch (err) {
    // no-op, handle optional dependency lack
}
