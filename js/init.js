requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '../'
    },
    map: {
        '*': {
            'json': 'vendor/requirejs-json'
        }
    }
});

requirejs(['stage']);