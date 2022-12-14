const Log = require("./Log");
const Configurations = require("../configurations/Configurations");


/**
 * @class ErrorLog
 * Its role is to write all error generated by the application on an error log
 */
class ErrorLog extends Log{
    constructor(){
        super();
        this.config = Configurations;
        this.logFile = 'error.log';
        this.errorFolder = 'ERROR';
        this.logFilePath;
        this.totalError = 0;
    }
   

    /**
     * Write an error message on a file
     * @param {String} errorMessage the error message to write on the file
     * @param {Object} error the javascript error generated
     * @param {String} filePath the path to the file where write the message
     */
    async writeError(errorMessage, error, filePath){
        
        const logFolderPath = this.getLogFolderPath();
        await this.mkdirPath(logFolderPath);
        this.logFilePath = `${logFolderPath}/${this.logFile}`;
        let message = this.getLine();
        message += this.margeSmall;
        
        if( filePath ){
            message += this.addErrorMessageWithFile(filePath);
        }

        message += this.addMessage(errorMessage, error.message);
        
       
        this.write(this.logFilePath, message);
        this.addOneToTotalError();

    }


    /**
     * add the path of file to the error message to write
     * @param {String} filePath the path of the file that generated the error
     * @returns {String} the part of the message to add
     */
    addErrorMessageWithFile(filePath){ 
        let message = '';       
        message += 'Une erreur est survenue avec le fichier :';
        message += this.margeSmall;
        message += filePath;
        message += this.margeSmall;
        
        return message;
    }


    /**
     * add the message error and the message of the object Error generated by javascript
     * to the message to write on the log
     * @param {String} errorMessage the error message of the application
     * @param {String} javascriptErrorMessage the error message of the Object Error generated by javascript
     * @returns {String} the message 
     */
    addMessage(errorMessage, javascriptErrorMessage){
        let message = "";
        message += errorMessage;
        message += this.margeSmall;
        message += javascriptErrorMessage;
        message += this.margeSmall;
        message += this.getLine();
        message += this.margeSmall;

        return message;
    }


    /**
     * create the path to the error folder
     * @returns {String} the path of the error folder
     */
    getLogFolderPath(){
        const reportPath = this.config.getDesktopPath(); 
        const folderReportName = this.config.getFolderReportName();
        return `${reportPath}/${folderReportName}/${this.errorFolder}`;
    }


    /**
     * Add one to the total of the error
     */
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