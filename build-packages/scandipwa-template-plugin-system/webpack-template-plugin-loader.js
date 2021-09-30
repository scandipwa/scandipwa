const xmldom = require('xmldom');

const getTemplatePlugins = require('./util/get-template-plugins');
const getGroupedPlugins = require('./util/get-grouped-plugins');
const { STRING_API_KEY, DOM_API_KEY } = require('./util/exposed-api-keys');
const handlePossiblePluginError = require('./error-handlers/possible-plugin-error');
const ensureValidValue = require('./util/ensure-valid-value');

const domParser = new xmldom.DOMParser();
const xmlSerializer = new xmldom.XMLSerializer();

// Parse with HTML mime type even if contains PHP to prevent throwing on invalid XML
const parseToDOM = (code) => domParser.parseFromString(code, 'text/html');
const parseToString = (dom) => xmlSerializer.serializeToString(dom);

/**
 * Execute middleware pattern on the initial file, put it through all the plugins
 * If some plugin is malformed or malfunctioning - the execution will be halted
 * This is defined in the correspoiding handlers
 * @param {string} templateFile
 */
module.exports = function middleware(templateFile) {
    const templatePlugins = getTemplatePlugins();
    const groupedTemplatePlugins = getGroupedPlugins(templatePlugins);

    // Perform DOM API usages first
    const middlewaredDOM = groupedTemplatePlugins[DOM_API_KEY].reduce(
        (acc, { name, override }) => handlePossiblePluginError(
            name,
            () => ensureValidValue(
                DOM_API_KEY,
                override({
                    dom: acc,
                    parser: domParser,
                    serializer: xmlSerializer
                })
            )
        ),
        parseToDOM(templateFile)
    );

    // Perform the text API usages second
    const middlewaredText = groupedTemplatePlugins[STRING_API_KEY].reduce(
        (acc, { name, override }) => handlePossiblePluginError(
            name,
            () => ensureValidValue(
                STRING_API_KEY,
                override({ markup: acc })
            )
        ),
        parseToString(middlewaredDOM)
    );

    return middlewaredText;
};
