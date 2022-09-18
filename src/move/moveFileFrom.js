
const { rename } = require('fs').promises;
/**
 * Transfert a file from one folder to another
 * @param {string} orginalPath original path of the file
 * @returns {Object} contains an async function get the final path on parameter to transfert the file
 */
const moveFileFrom = ( originalPath ) => {  
    return {
        to: async (finalPath) => await rename(originalPath, finalPath)
    }

}

module.exports = moveFileFrom;