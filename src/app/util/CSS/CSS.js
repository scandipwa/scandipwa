/**
 * Set of helpers related to CSS
 * @class CSS
 */
class CSS {
    /**
     * Change CSS custom property in referenced node scope
     * @static
     * @param  {HTMLElement} ref React reference to an HTML element (node).
     * @param  {String} name CSS variable name (without `--`).
     * @param  {String} value CSS variable value.
     * @return {void}
     * @memberof CSS
     */
    static setVariable(ref, name, value) {
        ref.current.style.setProperty(`--${name}`, value);
    }
}

export default CSS;
