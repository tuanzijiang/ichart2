module.exports = {
    'extends': 'airbnb',
    'env': {
        'browser': true
    },
    'rules': {
        'react/jsx-filename-extension': [0],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'import/prefer-default-export': 'off',
        'react/forbid-prop-types': 'off',
    },
    'plugins': ['import'],
    'settings': {
        'import/resolver': 'webpack',
    },
};