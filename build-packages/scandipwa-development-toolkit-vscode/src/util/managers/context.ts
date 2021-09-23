import * as vscode from 'vscode';

class ContextManager {
    static instance: ContextManager;
    static createInstance(context: vscode.ExtensionContext) {
        if (!this.instance) {
            this.instance = new this(context);
        }
    }

    static getInstance() {
        if (!this.instance) {
            throw new Error('createInstance should have been called first!');
        }

        return this.instance;
    }

    private constructor(
        protected context: vscode.ExtensionContext
    ) {}

    public getContext = () => this.context;
}

export default ContextManager;