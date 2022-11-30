const debug   = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path    = require('path');

const path_root  = path.resolve(__dirname);
const path_src  = path.resolve(__dirname, 'src')
const path_dist = path.resolve(__dirname, 'assets')

module.exports = {
    mode: "development",
    entry: "./src/ts/App.tsx",
    output: {
        path: path_dist, // 出力ファイルの格納先フォルダの基点
        filename: "app.js",
        publicPath: "/atashinchi/assets/", // ファイル内で置換処理された後のアセットフォルダの基点
    },
    module: {
        rules: [{
            test: [/\.tsx?$/],
            include: path_src,
            use: [
                'babel-loader',
                'ts-loader',
            ],
        },
        {
            test: /\.scss$/,
            include: path_src,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        },
        {
            test: /\.(svg|jpg|png)$/,
            include: path_src,
            loaders: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath: 'img',
            }
        }]
    },
    devServer: {
        contentBase: path_root,
        contentBasePublicPath: '/atashinchi/',
        historyApiFallback: {
            rewrites: [{ from: /^\/*/, to: '/atashinchi/index.html' }],
        },
        host: '192.168.1.2',
        hot: true,
        inline: true,
        open: true,
        openPage: 'atashinchi/',
        port: 8080,
        publicPath: '/atashinchi/assets/',
        watchContentBase: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    plugins: debug ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};
