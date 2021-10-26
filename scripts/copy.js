const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../src/pages');
const copyHtml = () => fs.readdirSync(root)
  .filter(file => /\.html$/.test(file))
  .forEach(file => fs.copyFileSync(
    path.resolve(root, file),
    path.resolve(__dirname, `../dist/${file}`)
  ));

module.exports = copyHtml;
