/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable scandipwa-extensibility/no-non-extensible-components */

/**
 * @fileoverview Class name must match the name of the file it is declared in.
 * @author Jegors Batovs
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/derived-class-names');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('derived-class-names', rule, {
    valid: [
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "class Hello { // assuming file name is Goodbye.component.js",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
