import PropTypes from 'prop-types';

export const SlideType = PropTypes.shape({
    slide_id: PropTypes.string,
    image: PropTypes.string,
    slide_text: PropTypes.string
});

export const SliderType = PropTypes.shape({
    slider_id: PropTypes.string,
    slides: PropTypes.arrayOf(SlideType)
});
