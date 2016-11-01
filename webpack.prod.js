const webpack = require('webpack');
const package = require('./package');

const banner = `${package.name} ${package.version} - ${package.description}\nCopyright (c) ${ new Date().getFullYear() } ${package.author} - ${package.homepage}\nLicense: ${package.license}`;

module.exports = {
  'context': __dirname + '/src',
  'entry': ['./index.js'],
  'output': {
    'path': __dirname + '/bin',
    'filename': `${package.name}.js`,
    'library': `react-puremvc`,
    'libraryTarget': 'umd'
  },
  target: 'node',
  debug: false,
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'babel'
    }]
  },
  'plugins': [
    new webpack.BannerPlugin(banner),
  ]
};
