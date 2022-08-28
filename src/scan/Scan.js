
const fs = require('fs').promises;
const path = require('path');
const getFileExtension = require('./getFileExtension');
const Terminal = require('../terminal/Terminal');
const MESSAGES = require('../../configuration/messages/messages')

class Scan{

    constructor(){
        this.filesFound ={};
        this.totalFilesFound = 0;
    }

    /**
     * start to search in each folder all the file 
     * and add file in the list if it extension is in the list of extensions 
     * @param {array} folders 
     * @param {object} extensionsToSearch 
     */
    async scanFolders(folders, extensionsToSearch){
        Terminal.margin(2);
        Terminal.echoH3(MESSAGES.scan.startScan);
        //  voir à modifier pour un for in
        return Promise.all(folders.map(async (folder) => {
            try{
                await this.scanFolder(folder, extensionsToSearch);
            }catch(err){

            }finally{
                // continue
            }
            
        }))

        

    }


    // search in the current folder and subfolder
    async scanFolder(folder, extensionsToSearch){
        const files = await fs.readdir(folder);

        return Promise.all(files.map( async ( file ) =>{            
            let filePath = path.resolve(folder+'/'+file);
            const stats = await fs.stat(filePath);
            
            if ( stats.isFile() ) { 
                let ext = getFileExtension(filePath);
                this.compareExtensionFileWithExtensionsToSearch(filePath, ext, extensionsToSearch);
            } else {
                await this.scanFolder(filePath, extensionsToSearch)
            }
        } ))
    }


    compareExtensionFileWithExtensionsToSearch(filePath, extFile, extensionsToSearch){
        for( let fileType in extensionsToSearch ){
            this.initializeFileTypeInFilesFound(fileType);
            let extensions = extensionsToSearch[fileType];            
            if (extensions.includes(extFile)){                  
                this.addFileInTheFilesList(filePath, fileType, extFile)
                break;
            }
        }   
    }


    addFileInTheFilesList(filePath, fileType, extFile){
        this.initializeFileExtensionInFilesFound(fileType, extFile); 
        this.filesFound[fileType][extFile].push(filePath);
        this.totalFilesFound ++;
    }


    initializeFileTypeInFilesFound(fileType){
        if( !this.filesFound.hasOwnProperty(fileType) ){
            this.filesFound[fileType] = {};
        }
    }


    initializeFileExtensionInFilesFound(fileType, extFile){
        if( !this.filesFound[fileType].hasOwnProperty(extFile) ){
            this.filesFound[fileType][extFile] = [];
        }
    }


    getfilesFound(){
        return this.filesFound;
    }

    getTotalFilesFound(){
        return this.totalFilesFound;
    }

}


module.exports = Scan;