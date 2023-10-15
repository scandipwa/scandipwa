module.exports = () => {
    // disable source maps
    if (process.env.NODE_ENV === 'production') {
        process.env.GENERATE_SOURCEMAP = 'false';
    }
};
