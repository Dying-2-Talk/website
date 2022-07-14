const path = require('path');
const fs = require('fs');
const sass = require('sass');
const glob = require('fast-glob');
const ts = require('typescript');

const { version } = require('../package.json');
const measure = (name, cb) => () => {
  console.log(`Starting [${name}]`);
  const start = performance.now();
  cb();
  console.log(`Finished [${name}]: ${Math.round(performance.now() - start)}ms`);
}

const clean = measure('clean', () => {
  fs.rmSync(path.resolve(__dirname, '../dist'), {
    recursive: true,
    force: true
  });
})

const copyAssets = measure('copyAssets', () => fs.cpSync(
  path.resolve(__dirname, '../src/assets'),
  path.resolve(__dirname, '../dist'),
  { recursive: true }
));

const copyHtml = measure('copyHtml', () => glob.sync('src/pages/**/*.html')
  .map(file => {
    const chunks = file.split('/').slice(2);

    let name = chunks.pop().split('.')[0];
    if (name === 'home') name = 'index';
    const folder = chunks.length === 1 ? '' : chunks[0];
    const newFile = path.resolve(__dirname, '../dist', folder, `${name}.html`)

    fs.cpSync(file, newFile, { recursive: true })
  }))

// Sass
const buildSass = measure('buildSass', () => glob.sync('src/pages/**/*.scss')
  .forEach(file => {
    const { css } = sass.renderSync({ file, outputStyle: 'compressed' });
    const { name } = path.parse(file);

    if (name === 'home') name = 'index';
    const newFile = path.resolve(__dirname, '../dist', `${name}-${version}.css`)

    fs.writeFileSync(newFile, css.toString())
  }))

// TS
const buildTs = measure('buildTs', () => {
  fs.mkdirSync(path.resolve(__dirname, '../dist/scripts'))
  glob.sync('src/ts/**/*.ts')
    .forEach(file => {
      const { name } = path.parse(file);

      const source = fs.readFileSync(file, 'utf-8');
      const options = fs.readFileSync(path.resolve(__dirname, '../tsconfig.json'), 'utf-8');
      const { outputText } = ts.transpileModule(source, JSON.parse(options).compilerOptions)

      fs.writeFileSync(path.resolve(
        __dirname,
        '../dist/scripts',
        `${name}-${version}.js`
      ), outputText)
    })
})

module.exports = {
  clean,
  copyAssets,
  copyHtml,
  buildSass,
  buildTs,
}
