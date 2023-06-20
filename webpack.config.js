const path = require('path')
const environment = process.env.NODE_ENV || 'dev'

module.exports = {
  entry: './src/cli.ts',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      userEnv$: path.resolve(__dirname, `.env/${environment}.ts`),
    },
  },
}
