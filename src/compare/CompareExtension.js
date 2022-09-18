
const path = require('path');

let instance;

/**
 * @class CompareExtension
 * is job is to compare the extension of two files
 */
class CompareExtension{

    constructor(){
        if(instance){
            throw new Error('Une instance de CompareExtension a déjà été créée.')
        }
        instance = this;
    }


    /**
     * compare extension of two files
     * @param {string} file1 
     * @param {string} file2 
     * @returns {Boolean} if extension is identical
     */
     haveTheSameExtension(file1, file2){
        const extensionFile1 = path.extname(file1);
        const extensionFile2 = path.extname(file2);

        return extensionFile1 === extensionFile2;
    }
    

}



module.exports = new CompareExtension();