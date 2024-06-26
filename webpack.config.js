const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry:{
        index: './src/index.js',
        home: './src/home.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: '[name][ext]'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    watch: true,
    
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/resource'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SignIn/Up',
            filename: 'index.html',
            template: 'src/template.html',
            chunks: [
                "index"
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'home.html',
            template: 'src/home.html',
            chunks: [
                "home"
            ],
        }),
    ],
}