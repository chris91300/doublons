
const fs = require('fs').promises;
const path = require('path');
const CopyController = require('../copyController/CopyController');
const Terminal = require('../terminal/Terminal');

/**
 * @class CompareControler
 * get a list of files and it job is to compare each file with the other files
 * compare extension
 * compare size
 * compare content
 * if two files are the same, insert the copy into the copyList
 */
class CompareControler{

    constructor(){

        this.terminal = Terminal;
        this.Copies = [];
        this.totalCopies = 0;
    }


    /**
     * compare each file in the list with the other files
     * to know if they are identical
     * @param {object} files the list of files to compare
     */
    async compareFiles(files, fileType, extension){
        
        const length = files.length;
        const beforeLast = length - 1;
        const totalComparison = this.totalComparison(length)
        this.terminal.setProgressBar(extension, totalComparison + 1);
        this.terminal.setOneToProgressBar(1, extension);
        
        try{
            for( let i = 0; i <= beforeLast; i++ ){
                const originalFile = files[i];
                
                if (this.isNotACopy(originalFile) ){         
                    const nextFileInTheList = i + 1;
                    const otherFiles = files.slice(nextFileInTheList);
                    
                    await this.compare(originalFile, otherFiles, fileType, extension, length);                  
                    
                }else {
                    let totalComparisonForCurrentFile = this.totalComparisonforThisIndex(i, length);
                    this.terminal.setOneToProgressBar(totalComparisonForCurrentFile, extension);// on ajout total...
                   
                }             
            }
        }catch(err){
            console.log(err)
        }
    }


    /**
     * compare one file with other files in the list
     * @param {string} originalFile the original file compared
     * @param {object} otherFiles list of the other files
     */
    async compare(originalFile, otherFiles, fileType, extension, length){
        
        let originalFileBuffer = await this.getContentOfTheFile(originalFile);

        for( let i = 0; i < otherFiles.length; i++){
            const comparedFile = otherFiles[i];

            if( this.isNotACopy(comparedFile)){
                
                const filesHaveTheSameExtension = this. haveTheSameExtension(originalFile, comparedFile);
                const filesHaveTheSameSise = await this.haveTheSameSise(originalFile, comparedFile);
                
                if( filesHaveTheSameExtension && filesHaveTheSameSise ) {
                    let isTheSameContent = await this.compareContent(originalFileBuffer, comparedFile);
                    
                    if ( isTheSameContent ){
                        this.addToCopies(comparedFile);                        
                        await CopyController.addNewCopy(originalFile, comparedFile, fileType);
                        
                        // gérer les log
                    }
                }
            }
            this.terminal.setOneToProgressBar(1, extension);
           
            
        }
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


    /**
     * check if the file have still identify as a copy
     * @param {string} file a file
     * @returns {boolean} if the file is a copy or not
     */
    isNotACopy(file){
        return !this.Copies.includes(file);
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

    

    // compare la taille en octet de 2 fichiers
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


    /**
     * add a file to the list of copy
     * @param {string} file 
     */
    addToCopies(file){
        this.Copies.push(file);
        this.totalCopies++;
    }


    /**
     * calcul the total of comparison
     * sum of N-1 + N-2 + .... + 1;
     * @param {number} length 
     * @returns {number} the total
     */
    totalComparison(length){
        let total = 0;        
        let index = length - 1

        while(index > 0){
            total += index;
            index--;
        }
        
        return total;
    }


    /**
     * calcul the total of comparison when start to the index until the end of array
     * only for the index
     * @param {number} index 
     * @param {number} length 
     * @returns {number} the total
     */
    totalComparisonforThisIndex(index, length){
        let total = ( length - 1 ) - index;
        return total;
    }


    getCopies(){
        return this.Copies;
    }


    
    getTotalCopies(){
        return this.totalCopies;
    }
}



module.exports = CompareControler;