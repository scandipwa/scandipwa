/**
 * @fileoverview All components should be extensible.
 * @author Jegors Batovs
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/use-extensible-base"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("use-extensible-base", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "class A extends ExtensiblePureComponent { /** ... */ }",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
