module.exports = function (api) {
  api.cache(true);
  const isTest = process.env.NODE_ENV === 'test';

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      ...(isTest ? [] : ['nativewind/babel']),
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: { '@': './src' },
          extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.svg'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
