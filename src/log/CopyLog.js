const Log = require('./Log');

const { mkdir } = require('fs').promises;

let instance;

/**
 * @class CopyLog
 * Write on a log informations about the copies found
 */
class CopyLog extends Log{

    constructor(){
        super();
        if(instance){
            throw new Error('Une instance de CopyLog a déjà été créée.')
        }
        instance = this;

        this.logFolder = 'Log';
        this.logFileName = 'liste_des_copies.log';

    }


    /**
     * adds a new original file for which copies were found
     * @param {String} originalFile original file
     * @param {String} fileTypeFolderPath the path to the file where to write log
     */
    async addOriginalFile(originalFile, fileTypeFolderPath){
        const rapportLogPathFolder = this.getRapportLogPathFolder(fileTypeFolderPath);
        await mkdir(rapportLogPathFolder, {recursive: true});
        const rapportLogPath = this.getRapportLogPathFile(rapportLogPathFolder);
        this.writeNewMessageForNewOriginalFile(originalFile, rapportLogPath);
    }

    /**
     * adds a new copy for the original file on the log file
     * @param {String} fileTypeFolderPath the path to the file where to write log
     * @param {String} copyOriginalPath the old path of the copy 
     * @param {String} copyNewPath the new path of the copy
     * @param {Boolean} copyNameHasBeenModified if the name of copy has been modified
     */
    async writeEventInLog(fileTypeFolderPath, copyOriginalPath, copyNewPath, copyNameHasBeenModified){
        const rapportLogPathFolder = this.getRapportLogPathFolder(fileTypeFolderPath);
        const rapportLogPath = this.getRapportLogPathFile(rapportLogPathFolder);

        this.writeMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath, rapportLogPath);
    }


    /**
     * create the path of the folder for this type of file
     * @param {String} fileTypeFolderPath the path of the folder for this type
     * @returns the path of the log file folder for this type
     */
    getRapportLogPathFolder(fileTypeFolderPath){
        return `${fileTypeFolderPath}/${this.logFolder}`;
    }


    /**
     * create the path of the log
     * @param {String} rapportLogPathFolder 
     * @returns the path
     */
    getRapportLogPathFile(rapportLogPathFolder){
        return `${rapportLogPathFolder}/${this.logFileName}`;
    }
    

    /**
     * write a message with path of the new original file 
     * @param {String} originalFile path of the original file
     * @param {String} rapportLogPath path of the log file
     */
    writeNewMessageForNewOriginalFile(originalFile, rapportLogPath){
        const message = this.getMessageForNewOriginalFile(originalFile);
        this.write(rapportLogPath, message);
    }   


    /**
     * Created a message to inform which is the original file
     * @param {String} originalFile 
     * @returns {String} the message
     */
    getMessageForNewOriginalFile(originalFile){
        originalFile = this.getPathForHumanRead(originalFile);

        let message ='';
        message += this.margeMiddle;
        message += this.getLine();
        message += this.margeMiddle;
        message += `\tFichier original : ${originalFile}`;
        message += this.margeMiddle;
        message += 'Copie(s) trouvée(s) : ';
        message += this.margeSmall;

        return message;
    }



    /**
     * Write a message to add informations about the copy
     * @param {String} copyNewPath new path of the copy
     * @param {Boolean} copyNameHasBeenModified if the name of the copy has been modified
     * @param {String} copyOriginalPath original path of the copy
     * @param {String} rapportLogPath the path of the log file
     */
    writeMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath, rapportLogPath){
        const message = this.getMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath);
        this.write(rapportLogPath, message);
    }


    /**
     * Created message to inform about the copy
     * @param {String} copyNewPath 
     * @param {String} copyNameHasBeenModified 
     * @param {String} copyOriginalPath 
     * @returns {String} the message created
     */
    getMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath){
        copyOriginalPath = this.getPathForHumanRead(copyOriginalPath);

        let messageCopy = '';
        messageCopy += this.margeSmall;
        messageCopy += `Le fichier => ${copyNewPath}`;
        messageCopy += copyNameHasBeenModified ? ' (nom modifié)' : '';        
        messageCopy += this.margeSmall;
        messageCopy += `provient de => ${copyOriginalPath}`;
        messageCopy += this.margeBig;

        return messageCopy;
    }



    /**
     * Replace all '\' by '/' in a path to a better reading
     * @param {String} path 
     * @returns 
     */
    getPathForHumanRead(path){
        path = path.replaceAll('\\', '/');
        return path;
    }

}


module.exports = new CopyLog();