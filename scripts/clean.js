const fs = require('fs');
const path = require('path');

fs.rmSync(path.resolve(__dirname, '../dist'), {
  force: true,
  recursive: true
});
