/* eslint-disable arrow-body-style */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
const { PureComponent } = require('react');

/**
 * This component allows ScandiPWA extension functionality.
 * If the class has plugins meant for its instances
 * its instance is being proxied at the moment of instantiation.
 */
module.exports = class ExtensiblePureComponent extends PureComponent {
    constructor(props) {
        super(props);
        const { __namespace__ } = Object.getPrototypeOf(this);
        const namespacePlugins = window.plugins?.[__namespace__]?.['instance']?.['get'];
        if (!namespacePlugins) {
            return;
        }

        return new Proxy(this, {
            get(target, memberName, rec) {
                if (memberName === 'Symbol.iterator') {
                    return target[Symbol.iterator].bind(target);
                }

                const origMember = Reflect.get(target, memberName, rec);

                const pluginsForCalledMember = namespacePlugins[memberName];
                if (!pluginsForCalledMember) {
                    return origMember;
                }

                // Sort plugins by priority
                pluginsForCalledMember.sort((a, b) => {
                    if (a.position > b.position) return -1;
                    if (a.position < b.position) return 1;
                    throw new Error(
                        `Cannot have equal position on different plugins of the same ${memberName} method
                        on ${Object.getPrototypeOf(target).constructor.name} class in ${__namespace__} namespace!`
                    );
                });

                const middlewaredFunction = function (...args) {
                    const newMember = pluginsForCalledMember.reduce(
                        (acc, { implementation }) => () => {
                            if (typeof origMember === 'object') {
                                return implementation(acc, rec);
                            }

                            return implementation(args, acc, rec);
                        }, typeof origMember === 'function'
                            ? (...originalArgs) => origMember.apply(rec, originalArgs)
                            : origMember
                    );

                    return newMember(args);
                };

                if (typeof origMember === 'object') {
                    return middlewaredFunction();
                }

                return middlewaredFunction;
            }
        });
    }
};
