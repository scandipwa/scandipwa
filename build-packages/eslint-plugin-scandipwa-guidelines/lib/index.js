const path = require('path');
const requireIndex = require('requireindex');

// import all rules in lib/rules
module.exports.rules = requireIndex(path.join(__dirname, 'rules'));
