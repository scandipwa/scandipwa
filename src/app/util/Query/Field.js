/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/**
 * Builds GraphQL query according to https://graphql.org/learn/queries/ documentation
 * @class Query
 * @extends Field
 */
class Field {
    /**
     * Class constructor
     *
     * @param  {String} name Name of the query from Schema
     * @memberof Query
     */
    constructor(name) {
        if (!name || typeof name !== 'string') throw new Error('Field name must be non-empty string');
        this._name = name;
        this._fieldList = {};
        this._argumentList = {};
        this._alias = '';
        this._variableDefinitions = '';
        this._variableValues = {};
        this._argumentDefinitions = [];
    }


    /**
     * @returns {String|string}
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {{}}
     */
    get fieldList() {
        return this._fieldList;
    }

    /**
     * Add field to query
     *
     * @param  {String|Field} field Field name or instance of Field to add
     * @return {Field}
     * @memberof Query
     */
    addField(field) {
        if (typeof field === 'object') {
            this._fieldList[ field.name ] = field;
        } else if (typeof field === 'string') {
            this._fieldList[ field ] = new Field(field);
        } else {
            throw new Error('Argument is not a string nor Field object');
        }

        return this;
    }

    /**
     * Add array of fields to query
     *
     * @param  {Array<Field|String>} fieldList List of field names of Field instances to add
     * @return {Field}
     * @memberof Query
     */
    addFieldList(fieldList) {
        fieldList.forEach(field => this.addField(field));
        return this;
    }

    /**
     * Add argument to query
     *
     * @param {String}argumentName
     * @param {String}type
     * @param {any}value
     * @returns {Field}
     * @memberof Field
     */
    addArgument(argumentName, type, value) {
        this._argumentList[ argumentName ] = {
            value,
            type
        };
        return this;
    }

    /**
     * Set alias, use setAlias() for chaining
     *
     * @param  {String} alias Alias name
     * @return {Field}
     * @memberof Query
     */
    set alias(alias) {
        this._alias = alias;
        return this;
    }

    /**
     * Wrapper to support chaining
     * @param  {String} alias Alias name
     * @param alias
     * @return {Field}
     * @memberof Query
     */
    setAlias(alias) {
        this.alias = alias;
        return this;
    }

    /**
     * Build the maps for fast access, before using withing a query
     *
     * @returns {Field}
     */
    build() {
        Object.keys(this._argumentList).forEach((argument) => {
            if (this._variableDefinitions.length > 0) this._variableDefinitions += ', ';
            this._variableDefinitions += `$${this._getVariableName(argument)}:${this._argumentList[ argument ].type}`;
            this._variableValues[ this._getVariableName(argument) ] = this._argumentList[ argument ].value;
            this._argumentDefinitions.push(`${argument}:$${this._getVariableName(argument)}`);
        });

        return this;
    }

    /**
     * @returns {string}
     */
    get variableDefinitions() {
        return this._variableDefinitions;
    }

    /**
     * @returns {{}}
     */
    get variableValues() {
        return this._variableValues;
    }

    /**
     * @returns {Array}
     */
    get argumentDefinitions() {
        if (this._argumentDefinitions) return this._argumentDefinitions;

        return null;
    }

    /**
     * Prefix field name with alias to create unique variable name
     *
     * @param {String} field
     */
    _getVariableName(field) {
        return `${ this._alias }_${ field }`;
    }

    /**
     * Convert and format arguments in to the string
     *
     * @private
     * @return {String}
     * @memberof Query
     */
    _argumentsToString() {
        if (!this.argumentDefinitions.length) return '';
        return `(${ this.argumentDefinitions.join(', ') })`;
    }

    /**
     * Convert and format fields in to the string
     *
     * @private
     * @return {String}
     * @memberof Query
     */
    _bodyToString() {
        const body = [];
        Object.keys(this._fieldList).forEach((property) => {
            body.push(this._fieldList[ property ].toString());
        });
        if (!body.length) return '';
        return `{ ${ body.join(', ') } }`;
    }

    /**
     * Convert and format aliases in to the string
     *
     * @private
     * @return {String}
     * @memberof Query
     */
    _aliasToString() {
        return this._alias ? `${ this._alias }:` : this._alias;
    }


    /**
     * Formats query selection elements as a string
     * NOTE: this only return query selection, not request body!
     *
     * @return {String} One line query, format: `{_alias: queryName (attr: $value) { field1, field2 }`
     * @memberof Query
     */
    toString() {
        return `${ this._aliasToString() }${ this.name }${ this._argumentsToString() }${ this._bodyToString() }`;
    }
}

export default Field;
