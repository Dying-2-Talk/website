const path = require('path');
const chokidar = require('chokidar');

const {
  copyAssets,
  copyHtml,
  buildSass,
  buildTs
} = require('./utils');

const cwd = path.resolve(__dirname, '../')

chokidar.watch('src/assets/**/*', { cwd })
  .on('change', () => { copyAssets() })

chokidar.watch('src/pages/**/*', { cwd })
  .on('change', () => { copyHtml() })

chokidar.watch('src/scss/**/*', { cwd })
  .on('change', () => { buildSass() })

chokidar.watch('src/ts/**/*', { cwd })
  .on('change', () => { buildTs() })
