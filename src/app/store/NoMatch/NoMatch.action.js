export const UPDATE_NOMATCH = 'UPDATE_NOMATCH';

/**
 * Update router to show NoMatch page
 * @param  {Boolean} noMatch New noMatch value
 * @return {void}
 */
const updateNoMatch = noMatch => ({
    type: UPDATE_NOMATCH,
    noMatch
});

export { updateNoMatch };
