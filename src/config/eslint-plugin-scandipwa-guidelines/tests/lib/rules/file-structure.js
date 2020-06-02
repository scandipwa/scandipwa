/**
 * @fileoverview File structure must comply to the strict guidelines of ScandiPWA
 * @author Jegors Batovs
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/file-structure"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("file-structure", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: ".component, .container & more",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
