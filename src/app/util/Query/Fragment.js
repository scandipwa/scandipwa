import Field from 'Util/Query/Field';

class Fragment extends Field {
    /**
     * Creates an instance of Fragment.
     * @param  {String} name Name of the Fragment
     * @memberof Fragment
     */
    constructor(name) {
        super(name);
        this._name = name;
    }

    /**
     * Add fragment syntax to name
     * @private
     * @return {String}
     * @memberof Fragment
     */
    _addFragmentSyntax() {
        return `... on ${this.name}`;
    }

    /**
     * Converts Field to string
     * @return {String}
     * @memberof Field
     */
    toString() {
        const { fieldList } = this;
        if (Object.keys(fieldList).length === 0) return this.name;
        const output = Object.keys(fieldList).map(key => fieldList[key].toString());
        return `${ this._addFragmentSyntax() } { ${ output.join(', ') } }`;
    }
}

export default Fragment;
