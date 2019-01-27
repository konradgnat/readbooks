const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

const config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'build.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'app'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIndentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: []
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ['nodemon app.js -- watch build']
    })
  );
}

module.exports = config;
