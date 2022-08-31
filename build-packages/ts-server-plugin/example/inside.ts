/** @namespace Me/1 */
class Start {
    method() {
        return 123;
    }
}

export class Bca extends Start {
    method1() {
        return 123;
    }
}

// Start => Start, Bca, Abc
// Hello/World => Abc