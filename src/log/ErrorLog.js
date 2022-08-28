const Log = require("./Log");
const Configurations = require("../configurations/Configurations");


class ErrorLog extends Log{
    constructor(){
        super();
        this.config = Configurations;
        this.logFile = 'error.log';
        this.errorFolder = 'ERROR';
        this.logFilePath;
        this.totalError = 0;
    }
   


    async writeError(errorMessage, error, filePath){
        
        const logFolderPath = this.getLogFolderPath();
        this.mkdirPath(logFolderPath);
        this.logFilePath = `${logFolderPath}/${this.logFile}`;
        let message = this.getLine();
        message += this.margeSmall;
        
        if( filePath ){
            message += this.addErrorMessageWithFile(filePath);
        }

        message += this.addMessage(errorMessage, error);
        
       
        this.write(this.logFilePath, message);
        this.addOneToTotalError();

    }


    addErrorMessageWithFile(filePath){ 
        let message = '';       
        message += 'Une erreur est survenue avec le fichier :';
        message += this.margeSmall;
        message += filePath;
        message += this.margeSmall;
        
        return message;
    }


    addMessage(errorMessage, error){
        let message = "";
        message += errorMessage;
        message += this.margeSmall;
        message += error.message;
        message += this.margeSmall;
        message += this.getLine();
        message += this.margeSmall;

        return message;
    }


    getLogFolderPath(){
        const rapportPath = this.config.getDesktopPath(); 
        const folderRapportName = this.config.getFolderRapportName();
        return `${rapportPath}/${folderRapportName}/${this.errorFolder}`;
    }



    addOneToTotalError(){
        this.totalError++;
    }
    

    getTotalError(){
        return this.totalError;
    }


    getLogFilePath(){
        return this.logFilePath;
    }

}


module.exports = new ErrorLog();