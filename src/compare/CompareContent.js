
const fs = require('fs').promises;

let instance;

/**
 * @class CompareContent
 * is job is to compare the content of two files
 */
class CompareContent{

    constructor(){
        if(instance){
            throw new Error('Une instance de CompareContent a déjà été créée.')
        }
        instance = this;
    }


    /**
     * compare the content of two files
     * @param {object} originalFileBuffer buffer of the first file
     * @param {string} comparedFile the second file
     * @returns {boolean} if they have the same content
     */
     async compareContent(originalFileBuffer, comparedFile){         
        let comparedFileContent = await this.getContentOfTheFile(comparedFile);
        let sameContent = originalFileBuffer.compare(comparedFileContent) === 0 ? true : false;
        return sameContent;
    }



    /**
     * get the content of the file
     * @param {string} file the file
     * @returns content of the file (buffer)
     */
     async getContentOfTheFile(file){
        let fileContentStr = await fs.readFile(file, 'utf-8');            
        let fileContent = Buffer.from(fileContentStr);
        
        return fileContent;
    }
    

}



module.exports = new CompareContent();