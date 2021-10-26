const fs = require('fs');
const path = require('path');

fs.mkdirSync(path.resolve(__dirname, '../dist/assets'), { recursive: true });

const copyHtml = () => {
  const root = path.resolve(__dirname, '../src/html');

  fs.readdirSync(root)
    .filter(file => /\.html$/.test(file))
    .forEach(file => fs.copyFileSync(
      path.resolve(root, file),
      path.resolve(__dirname, `../dist/${file}`)
    ));
};

const copyAssets = () => {
  const root = path.resolve(__dirname, '../src/assets');

  fs.readdirSync(root)
    .forEach(file => fs.copyFileSync(
      path.resolve(root, file),
      path.resolve(__dirname, `../dist/assets/${file}`)
    ));
};

module.exports = {
  copyHtml,
  copyAssets
};
