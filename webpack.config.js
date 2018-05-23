const path = require('path');

module.exports = function (env, argv) {
    return {
        entry: './src/js/cceditor.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'cceditor.min.js'
        },
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-maps' : 'eval',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" }
                    ]
                }
            ]
        }
    };
};
