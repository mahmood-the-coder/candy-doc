import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path"
export default {
  target: "web",
  entry: {
    styles: "./main.css", // Entry point for the CSS file
  },
  output: {
    path: path.resolve("min-css"), // Output directory
  },
  mode: "production", // or "development"
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "renderer.css", // Extract CSS into a file named after the entry point
    }),
  ],
};
