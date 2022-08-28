
const {renameSync } = require('fs');

/**
 * transfère un fichier dans un autre fichier
 * @param {string} orginalPath 
 * @returns 
 */
const moveFileFrom = ( originalPath ) => {  
    return {
        to: (finalPath) => renameSync(originalPath, finalPath)
    }

}

module.exports = moveFileFrom;