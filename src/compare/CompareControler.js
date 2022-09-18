
const fs = require('fs').promises;
/* A node.js module that provides utilities for working with file and directory paths. */
const path = require('path');
const CopyController = require('../copyController/CopyController');
const ErrorLog = require('../log/ErrorLog');
const Terminal = require('../terminal/Terminal');
const CompareContent = require('./CompareContent');
const CompareExtension = require('./CompareExtension');
const CompareSize = require('./CompareSize');

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
     * @param {string} fileType
     * @param {string} extension
     */
    async compareFiles(files, fileType, extension){
        
        const length = files.length;
        const beforeLast = length - 1;
        const totalComparison = this.totalComparison(length)
        this.terminal.setProgressBar(extension, totalComparison + 1);
        this.terminal.setOneToProgressBar(1, extension);
        
        try{
            for( let i = 0; i <= beforeLast; i++ ){
                const indexOriginalFile = i;
                const originalFile = files[indexOriginalFile]; 
                const nextIndexFileInTheList = indexOriginalFile + 1;
                const otherFiles = files.slice(nextIndexFileInTheList);

                await this.compareFileWithOther(originalFile, indexOriginalFile, otherFiles, fileType, extension, length);
                          
            }
        }catch(err){            
            const errorMessage = `Une erreur inattendue est survenue lors de la comparaison de deux fichiers de type ${fileType} et d'extension ${extension}.`
            await ErrorLog.writeError(errorMessage, err);
        }finally{
            // continue
        }
    }



    /**
     * compare one file to each file in a list of files if 
     * the original file is not contain in the copy list
     * @param {string} originalFile the file compared to others
     * @param {number} indexOriginalFile index of the original file in the list of files found
     * @param {object} otherFiles list of others files
     * @param {string} fileType type of files compared
     * @param {string} extension extension of files compared
     * @param {number} length length of the list of files found
     */
    async compareFileWithOther(originalFile, indexOriginalFile, otherFiles, fileType, extension, length){
        if (this.isNotACopy(originalFile) ){  
            await this.compare(originalFile, otherFiles, fileType, extension);    
        }else {
            let totalComparisonForCurrentFile = this.totalComparisonforThisIndex(indexOriginalFile, length);
            this.terminal.setOneToProgressBar(totalComparisonForCurrentFile, extension);                   
        }   
    }


    /**
     * compare one file with other files in the list
     * @param {string} originalFile the original file compared
     * @param {object} otherFiles list of the other files
     */
    async compare(originalFile, otherFiles, fileType, extension){
        
        let originalFileBuffer = await CompareContent.getContentOfTheFile(originalFile);

        for( let i = 0; i < otherFiles.length; i++){
            const comparedFile = otherFiles[i];
            await this.compareThisTwoFiles(originalFile, originalFileBuffer, comparedFile, fileType, extension);
                       
        }
    }



    /**
     * compare two files ( extension, size and content )
     * @param {string} originalFile 
     * @param {object} originalFileBuffer 
     * @param {string} comparedFile 
     * @param {string} fileType 
     * @param {string} extension 
     */
    async compareThisTwoFiles(originalFile, originalFileBuffer, comparedFile, fileType, extension){
        if( this.isNotACopy(comparedFile)){
                
            const filesHaveTheSameExtension = CompareExtension.haveTheSameExtension(originalFile, comparedFile);
            const filesHaveTheSameSise = await CompareSize.haveTheSameSise(originalFile, comparedFile);
            
            if( filesHaveTheSameExtension && filesHaveTheSameSise ) {
                await this.compareContentOfThisTwoFiles(originalFile, originalFileBuffer, comparedFile, fileType);
            }
        }
        this.terminal.setOneToProgressBar(1, extension); 
    }


    /**
     * compare the contetnt of two files
     * @param {string} originalFile 
     * @param {object} originalFileBuffer 
     * @param {string} comparedFile 
     * @param {string} fileType 
     */
    async compareContentOfThisTwoFiles(originalFile, originalFileBuffer, comparedFile, fileType){
        const isTheSameContent = await CompareContent.compareContent(originalFileBuffer, comparedFile);
                
        if ( isTheSameContent ){
            this.addToCopies(comparedFile);                        
            await CopyController.addNewCopy(originalFile, comparedFile, fileType);
        }
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


    /**
     * get list copies found
     * @returns {object} the list of copies found
     */
    getCopies(){
        return this.Copies;
    }


    /**
     * get total copies found
     * @returns {number} the total of copies found
     */
    getTotalCopies(){
        return this.totalCopies;
    }
}



module.exports = CompareControler;