export const UPDATE_CMS_BLOCKS = 'UPDATE_CMS_BLOCKS';
export const UPDATE_SLIDER = 'UPDATE_SLIDER';

/**
 * Update CMS Block information
 * @param {Object} block URL Key of the page that must be returned
 */
const updateCmsBlocks = blocks => ({
    type: UPDATE_CMS_BLOCKS,
    blocks
});

/**
 * Update Homepage slider
 * @param {Object} slider Slider object with id and slides
 */
const updateSlider = slider => ({
    type: UPDATE_SLIDER,
    slider
});

export { updateCmsBlocks, updateSlider };
