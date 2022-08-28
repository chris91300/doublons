const Log = require('./Log');

const { mkdir } = require('fs').promises;

let instance;

class CopyLog extends Log{

    constructor(){
        super();
        if(instance){
            throw new Error('Une instance de CopyLog a déjà été créée.')
        }
        instance = this;

        this.logFolder = 'Log';
        this.logFileName = 'liste_des_copies.log';
        this.lastOriginalFile = "";

    }


    async addOrginalFile(originalFile, fileTypeFolderPath){
        const rapportLogPathFolder = this.getRapportLogPathFolder(fileTypeFolderPath);
        await mkdir(rapportLogPathFolder, {recursive: true});
        const rapportLogPath = this.getRapportLogPathFile(rapportLogPathFolder);
        this.writeNewMessageForNewOriginalFile(originalFile, rapportLogPath);
    }

    async writeEventInLog(fileTypeFolderPath, originalFile, copyOriginalPath, copyNewPath, copyNameHasBeenModified){
        const rapportLogPathFolder = this.getRapportLogPathFolder(fileTypeFolderPath);
        const rapportLogPath = this.getRapportLogPathFile(rapportLogPathFolder);

        this.writeMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath, rapportLogPath);
    }


    getRapportLogPathFolder(fileTypeFolderPath){
        return `${fileTypeFolderPath}/${this.logFolder}`;
    }

    getRapportLogPathFile(rapportLogPathFolder){
        return `${rapportLogPathFolder}/${this.logFileName}`;
    }


    doesItNewOriginalFile(originalFile, rapportLogPath){        
        if( originalFile !== this.lastOriginalFile ){
            this.setLastOriginaleFile(originalFile);
            this.writeNewMessageForNewOriginalFile(originalFile, rapportLogPath);            
        }
    }


    writeNewMessageForNewOriginalFile(originalFile, rapportLogPath){
        const message = this.getMessageForNewOriginalFile(originalFile);
        this.write(rapportLogPath, message);
    }   


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



    writeMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath, rapportLogPath){
        const message = this.getMessageForCopy(copyNewPath, copyNameHasBeenModified, copyOriginalPath);
        this.write(rapportLogPath, message);
    }


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




    getPathForHumanRead(path){
        path = path.replaceAll('\\', '/');
        return path;
    }


    setLastOriginaleFile(originalFile){
        this.lastOriginalFile = originalFile;
    }
}


module.exports = new CopyLog();