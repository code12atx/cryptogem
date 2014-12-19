module.exports = {
    context: __dirname + '/src',

    entry: {
        index: './index.js',
    },

    output: {
        path: '../public',
        filename: '[name].js'

    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?insertPragma=React.DOM' }
        ],

        resolve: {
            extensions: [ '.js', '.jsx' ],
            root: __dirname + '/src'
        }
    }
};


