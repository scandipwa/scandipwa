function constructMessage(error, help, documentationLink) {
    return (
        `${ error }\n` +
        `Help: ${ help }\n` +
        `For more information, see: ${ documentationLink }`
    );
}

module.exports = {
    constructMessage,
};
