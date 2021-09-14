/* eslint-disable scandipwa-extensibility/no-non-extensible-components */

/**
 * @fileoverview Eslint plugin for ScandiPWA development
 * @author Alfreds Genkins
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const path = require('path');
const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(path.join(__dirname, 'rules'));
