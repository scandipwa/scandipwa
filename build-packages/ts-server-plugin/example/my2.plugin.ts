const pluginForMethod = () => {
    return 'ABC';
};

export default {
    'Hello/World': {
        'member-function': {
            method2: pluginForMethod
        },
        'static-member': {
            method3: () => 123
        }
    }
}