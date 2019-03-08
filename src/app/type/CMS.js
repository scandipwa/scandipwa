import PropTypes from 'prop-types';

export const PageType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string
});

export const BlockType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
});

export const BlockListType = PropTypes.shape({
    items: PropTypes.objectOf(BlockType)
});
