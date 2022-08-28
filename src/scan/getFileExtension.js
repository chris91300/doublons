
const path = require('path');


const getFileExtension = (file) => {
    let extension = path.extname(file);
    let extensionWithoutDote = extension.slice(1);
    let extensionLower = extensionWithoutDote.toLocaleLowerCase();

    return extensionLower;
    
}

module.exports = getFileExtension;