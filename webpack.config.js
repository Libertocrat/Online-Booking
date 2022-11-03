const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './front-end/index.js',  // path to our input file
  output: {
    filename: 'main.js',  // output bundle file name
    path: path.resolve(__dirname, './static'),  // path to our Django static directory
  },
  module: { 
    rules: [
      { // React files loader with Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
      /*
      { // CSS loaders
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      
      { // Sass & SCSS loaders
        test: /\.s[ac]ss$/i,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ]
      },*/
      { // Global SCSS/CSS + React SCSS/CSS Modules
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                //options: { modules: true, exportOnlyLocals: false }
                options: { modules: true }
              },
              "sass-loader"
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          }
        ]
      },
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
};