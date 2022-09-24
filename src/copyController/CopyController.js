
const path = require('path')
const Configurations = require("../configurations/Configurations");
const CopyLog = require("../log/CopyLog");
const ErrorLog = require('../log/ErrorLog');
const { mkdir, writeFile, readFile } = require('fs').promises;
const Terminal = require("../terminal/Terminal");


/**
 * @class CopyController
 * create a list of copies
 */
class CopyController{
    constructor(){
        this.terminal = Terminal;
        this.config = Configurations;
        this.log = CopyLog;
        this.copyList = {};
        this.historyFile = 'history.json';
        this.historyPath = path.resolve(__dirname, this.historyFile);
        this.totalCopies = 0;
    }


    /**
     * transfer a file from one folder to another
     * @param {string} originalFile 
     * @param {string} copyOriginalPath
     * @param {string} fileType 
     */
     async addNewCopy(originalFile, copyOriginalPath, fileType){       
        try{       
             const fileTypeFolderPath = this.getTypeFolderPath(fileType);
             await this.createFolderIfNoExist(fileTypeFolderPath);
             this.addCopy(originalFile, copyOriginalPath, fileTypeFolderPath);             
        }catch(err){     
            const errorMessage = "Une erreur inattendue est survenue lors de l'ajout du fichier à la liste des copies.";       
            await ErrorLog.writeError(errorMessage, err, copyOriginalPath)           
        }finally{
         //  continue
        }
      }


      /**
       * construct the folder path to the type of the file
       * @param {string} fileType 
       * @returns the folder path
       */
    getTypeFolderPath(fileType){
        const reportPath = this.config.getDesktopPath(); 
        const folderReportName = this.config.getFolderReportName();
        const path = `${reportPath}/${folderReportName}/${fileType}`;
      
        return path;
    }


    async createFolderIfNoExist(folder){
        await mkdir(folder, {recursive : true});
    }


    /**
     * extract the file name with extension of a path (name.ext)
     * @param {String} file the path of the file
     * @returns {String} the file name
     */
    getFileName(file){
        let ext = path.extname(file);
        let baseName = path.basename(file, ext);
        let fileName = baseName + ext;

        return fileName;
    }


    /**
     * extract the file name and the extension of a path (name.ext)
     * @param {String} file the path of the file
     * @returns {Object} the file name and the extension
     */
    getNameAndExt(file){
        let ext = path.extname(file);
        let baseName = path.basename(file, ext);

        return [baseName, ext];
    }


    /**
     * Modify the name of a file if the folder already content a file with the same name
     * @param {String} originalFile original path of the file
     * @param {String} folder folder in which one put the file
     * @param {String} fileName name of the file
     * @param {String} ext extension of the file
     * @returns {Object} array with the final path of the file and if the file name have been modified
     */
    createNewFilePath(originalFile, folder, fileName, ext){
        const listOfCopies = this.getCopyListFor(originalFile);
        let completedFileName = fileName + ext;
        let copyFinalPath = `${folder}/${completedFileName}`;
        let fileAlreadyExist = this.doesCopyFinalAlreadyExist(listOfCopies, copyFinalPath);
        let compteur = 1;
        let nameHasBeenModified = false;

        while( fileAlreadyExist ) {
            nameHasBeenModified = true;
            completedFileName = `${ fileName }(${ compteur })${ ext }`;
            copyFinalPath = `${folder}/${completedFileName}`;
            fileAlreadyExist = this.doesCopyFinalAlreadyExist(listOfCopies, copyFinalPath);
            compteur++;
        }

        return [ copyFinalPath, nameHasBeenModified ];
    }


    /**
     * Verify if the file is already considered as a copy
     * @param {Object} listOfCopies list of the copies found
     * @param {String} copyFinalPath the path of the file
     * @returns {Boolean} if the file is already considered as a copy
     */
    doesCopyFinalAlreadyExist(listOfCopies, copyFinalPath){
        let alreayExist = false;

        for( let copy of listOfCopies ){
            if( copyFinalPath === copy.copyFinalPath ){
                alreayExist = true;
                break;
            }
        }

        return alreayExist;
    }



    /**
     * add a path file in the list of copies
     * @param {String} originalFile the file considered as the original file
     * @param {String} copyOriginalPath the copy
     * @param {String} fileTypeFolderPath folder of the file type in which to insert the copy
     */
    addCopy(originalFile, copyOriginalPath, fileTypeFolderPath){
        this.setOriginal(originalFile, fileTypeFolderPath);
        let [name, ext] = this.getNameAndExt(copyOriginalPath);
        let [ copyFinalPath, copyNameHasBeenModified ] = this.createNewFilePath(originalFile, fileTypeFolderPath, name, ext);
        const item = this.createItem(copyOriginalPath, copyFinalPath, copyNameHasBeenModified);
        this.copyList[originalFile].copyList.push(item);
        this.totalCopies++;
    }


    /**
     * initialise a new empty list f copy for an original file
     * @param {String} original original file
     * @param {String} fileTypeFolderPath folder of the file type
     */
    setOriginal(original, fileTypeFolderPath){
        if( !this.copyList[original] ){
            this.copyList[original] = {
                fileTypeFolderPath,
                copyList : []
            };
        }
    }


    /**
     * create a new item. An item is an object contains informations about a copy
     * @param {String} copyOriginalPath 
     * @param {String} copyFinalPath 
     * @param {String} copyNameHasBeenModified 
     * @returns 
     */
    createItem(copyOriginalPath, copyFinalPath, copyNameHasBeenModified){
        return {
            copyOriginalPath,
            copyFinalPath,
            copyNameHasBeenModified
        }
    }


    // TODO ajouter un report erreur si err et créer une class History
    /**
     * write in a file the copies list
     */
    async writeHistory(){
        await writeFile(this.historyPath, JSON.stringify(this.copyList), (err)=>{
            if(err){
                console.log(err)
            }
        });
    }


    /**
     * return the copies list for an original file
     * @param {String} originalFile 
     * @returns the list
     */
    getCopyListFor(originalFile){
        if( this.copyList[originalFile] ){
            return this.copyList[originalFile].copyList;
        }
    }


    /** 
     * @returns all the copies found
     */
    async getCopyList(){
        let list = await readFile(this.historyPath);
        list = JSON.parse(list);
        return list;
    }  
    
    
    /**
     * @returns the total number of copies found
     */
    getTotalCopies(){
        return this.totalCopies;
    }

}

module.exports = new CopyController();