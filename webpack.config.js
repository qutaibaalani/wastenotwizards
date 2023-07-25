module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ],
          include: /\.module\.css$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: /\.global\.css$/,
        },
      ],
    },
  };
  