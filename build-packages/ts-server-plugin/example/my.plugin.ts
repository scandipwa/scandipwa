const pluginForMethod = () => {
    return 'ABC';
};

const a = () => {
    return '111';
};

export default {
    'Hello/World': {
        'member-function': {
            method: pluginForMethod,
            method3: () => 123,
            a,
            b: () => 11,
        }
    },
    'Wrong/Namespace': {
        'function': () => {}
    },
    'Test': {
        'function': pluginForMethod,
    },
    'Me/1': {
        'member-function': {
            'method': () => {}
        }
    }
}
