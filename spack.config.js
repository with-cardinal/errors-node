module.exports = {
  entry: {
    web: __dirname + "/src/browser.ts",
  },
  output: {
    path: __dirname + "/dist/browser/",
  },
  options: {
    minify: true,
  },
};
