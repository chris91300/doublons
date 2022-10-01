
const fs = require('fs')

const fileExist = (path) => {
    let fileExist = fs.existsSync(path);

    return fileExist;
}

module.exports = fileExist;