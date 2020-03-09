/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
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
        this._variableDefinitions = [];
        this._variableValues = {};
        this._argumentDefinitions = [];
        this._component = 'query';
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
            if (!field.name) throw new Error('Argument does not have `name` property');

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
        if (!Array.isArray(fieldList)) throw new Error('Argument must be array');

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
        if (!argumentName || typeof argumentName !== 'string') throw new Error('Argument must be non-empty string');
        if (!type || typeof type !== 'string') throw new Error('Argument `type` must be non-empty string');

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
        if (typeof alias !== 'string') throw new Error('Argument is not a string');
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
        if (typeof alias !== 'string') throw new Error('Argument is not a string');
        this.alias = alias;
        return this;
    }

    /**
     * Sets GraphQL component type: query, mutation, etc.
     * @param {String} component
     * @return {Field}
     * @memberof Query
     */
    setComponentType(component) {
        if (!component || typeof component !== 'string') throw new Error('Argument must be non-empty string');
        this._component = component;
        return this;
    }

    /**
     * Build the maps for fast access, before using withing a query
     *
     * @returns {Field}
     */
    build(args = []) {
        Object.keys(this._argumentList).forEach((argument) => {
            const variableName = this._getVariableName(argument, args);

            this._variableDefinitions.push(
                `$${ variableName }:${ this._argumentList[ argument ].type }`
            );
            this._variableValues[ variableName ] = this._argumentList[ argument ].value;
            this._argumentDefinitions.push(`${ argument }:$${ variableName }`);
        });

        Object.values(this._fieldList).forEach((field) => {
            const { variableDefinitions, variableValues } = field.build(args);
            this._variableDefinitions.push(...variableDefinitions);
            this._variableValues = { ...this._variableValues, ...variableValues };
        });

        return {
            variableDefinitions: this._variableDefinitions,
            variableValues: this._variableValues
        };
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
    _getVariableName(arg, args, index = 0) {
        const argName = `${ this._alias }_${ arg }_${ index }`;

        if (!args.includes(argName)) {
            args.push(argName);
            return argName;
        }

        const nextIndex = index + 1;
        return this._getVariableName(arg, args, nextIndex);
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
     * @return {String} One line query, format: `_alias: queryName (attr: $value) { field1, field2 }`
     * @memberof Query
     */
    toString() {
        return `${ this._aliasToString() }${ this.name }${ this._argumentsToString() }${ this._bodyToString() }`;
    }
}

export default Field;
