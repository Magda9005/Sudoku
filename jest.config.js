module.exports = {
    transform: {
      '\\.js$': ['babel-jest', { configFile: './babel.config.testing.js' }]
    },
    roots: ['../']
  };