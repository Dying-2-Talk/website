const chokidar = require('chokidar');

const copyHtml = require('./copy');

chokidar
  .watch('src/pages/*.html')
  .on('ready', () => console.info('[watch.js] watching files'))
  .on('change', path => {
    copyHtml();
    console.info(`[watch.js] copied ${path}`);
  });
