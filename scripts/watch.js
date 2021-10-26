const chokidar = require('chokidar');

const { copyHtml, copyAssets } = require('./copy');

chokidar
  .watch([
    'src/pages/*.html',
    'src/assets'
  ])
  .on('ready', () => {
    console.info('[watch.js] watching files');
    copyHtml();
    copyAssets();
    console.info('[watch.js] copied files');
  })
  .on('all', (type, path) => {
    if (path.includes('.html')) copyHtml();
    if (path.includes('assets')) copyAssets();
    console.info(`[watch.js] copied ${path} (${type})`);
  });
