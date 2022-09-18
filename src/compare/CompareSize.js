
const fs = require('fs').promises;

let instance;

/**
 * @class CompareSize
 * is job is to compare the size of two files
 */
class CompareSize{

    constructor(){
        if(instance){
            throw new Error('Une instance de CompareSize a déjà été créée.')
        }
        instance = this;
    }


    /**
     * compare the size (octets) of two file
     * @param {string} file1 
     * @param {string} file2 
     * @returns {Boolean} if size is identical
     */
    async haveTheSameSise(file1, file2){
        let sizeFile1 = await fs.stat(file1).size;  
        let sizeFile2 = await fs.stat(file2).size;  
        
        return sizeFile1 === sizeFile2;  
    }
    

}



module.exports = new CompareSize();