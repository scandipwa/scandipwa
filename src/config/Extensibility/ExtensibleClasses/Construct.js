/**
 * Call the magic '__construct' member function on passed object
 * Only if it is present in the object
 * @param {Object} instance
 */
module.exports = (instance, args) => {
    instance.__construct(...args);

    return instance;
};
