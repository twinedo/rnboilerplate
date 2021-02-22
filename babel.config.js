module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.devenv', //dev
        // path: '.prodenv', //prod
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: false,
      },
    ],
  ],
};
