
const path = require('path')
const Configurations = require("../configurations/Configurations");
//const MESSSAGES = require('../../configuration/messages/messages');
const CopyLog = require("../log/CopyLog");
const { mkdir, writeFile, readFile } = require('fs').promises;
const Terminal = require("../terminal/Terminal");



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
     * transfère un fichier d'un dossier vers un autre
     * @param {string} originalFile le fichier original
     * @param {string} copyOriginalPath la copie du fichier original
     * @param {string} fileType le type de fichier des fichiers (audio, document, picture, video)
     */
     async addNewCopy(originalFile, copyOriginalPath, fileType){       
        try{       
             const fileTypeFolderPath = this.getTypeFolderPath(fileType);
             await this.createFolderIfNoExist(fileTypeFolderPath);
             this.addCopy(originalFile, copyOriginalPath, fileTypeFolderPath);             
        }catch(err){            
             //this.whriteError();            
        }finally{
         //  continue
        }
      }


    getTypeFolderPath(fileType){
        const rapportPath = this.config.getDesktopPath(); 
        const folderRapportName = this.config.getFolderRapportName();
        const path = `${rapportPath}/${folderRapportName}/${fileType}`;
      
        return path;
    }


    async createFolderIfNoExist(folder){
        await mkdir(folder, {recursive : true});
    }


    getFileName(file){
        let ext = path.extname(file);
        let baseName = path.basename(file, ext);
        let fileName = baseName + ext;

        return fileName;
    }


    getNameAndExt(file){
        let ext = path.extname(file);
        let baseName = path.basename(file, ext);

        return [baseName, ext];
    }

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

    //  avertie par un message dans la console qu'il y a eu un problème avec un fichier
   /* whriteError(){ 
        this.terminal.margin();
        this.terminal.echoErrorMessage(MESSSAGES.error.move.messageBeforePath);
        this.terminal.echoErrorMessage(copyOriginalPath);
        this.terminal.echoErrorMessage(MESSSAGES.error.move.messageAfterPath)
        this.terminal.margin();
    }*/


    addCopy(originalFile, copyOriginalPath, fileTypeFolderPath){
        this.setOriginal(originalFile, fileTypeFolderPath);
        let [name, ext] = this.getNameAndExt(copyOriginalPath);
        let [ copyFinalPath, copyNameHasBeenModified ] = this.createNewFilePath(originalFile, fileTypeFolderPath, name, ext);
        const item = this.createItem(copyOriginalPath, copyFinalPath, copyNameHasBeenModified);
        this.copyList[originalFile].copyList.push(item);
        this.totalCopies++;
    }


    setOriginal(original, fileTypeFolderPath){
        if( !this.copyList[original] ){
            this.copyList[original] = {
                fileTypeFolderPath,
                copyList : []
            };
        }
    }


    createItem(copyOriginalPath, copyFinalPath, copyNameHasBeenModified){
        return {
            copyOriginalPath,
            copyFinalPath,
            copyNameHasBeenModified
        }
    }


    async writeHistory(){
        await writeFile(this.historyPath, JSON.stringify(this.copyList), (err)=>{
            if(err){
                console.log(err)
            }
        });
    }


    getCopyListFor(originalFile){
        if( this.copyList[originalFile] ){
            return this.copyList[originalFile].copyList;
        }
    }


    async getCopyList(){
        let list = await readFile(this.historyPath);
        list = JSON.parse(list);
        return list;
    }  
    
    
    getTotalCopies(){
        return this.totalCopies;
    }

}

module.exports = new CopyController();