
const Terminal = require("../terminal/Terminal");
const configMessages = require('../../configuration/messages/messages');
const configCodes = require('../../configuration/configCodes');
const ErrorLog = require("../log/ErrorLog");


/**
 * @class  Process
 * Its role is to close the application with the good message
 */
class Process{

    constructor(){
        this.terminal = Terminal;
        this.message = configMessages;
        this.codes = configCodes;
    }

    /**
     * add callback to node events 'beforeExit' and 'exit'
     */
    startListenEventExitApplication(){
        process.on('beforeExit', this.wereThereAnyErrors.bind(this))
        process.on("exit", this.closeApplication.bind(this))
    }

    /**
     * call the good function in terms of the closing code
     * @param {Number} code the closing code
     */
    closeApplication(code){
        
        switch(code){

            case this.codes.closeWithoutTimer:
                this.closeWithoutTimer();
                break;

            case this.codes.closeWithNotEnoughFile:
                this.closeWithNotEnoughFile();
                break;

            case this.codes.closeWithoutCopy:
                this.closeWithoutCopy();
                break;

            default:
                this.closeWithTimer();
        
        }
    }

    /**
     * close application with a message without timer
     */
    closeWithoutTimer(){
        this.terminal.margin(2);
        this.terminal.echo(this.message.close.withoutTimer);
    }


    /**
     * close application with a message without enough file
     */
    closeWithNotEnoughFile(){
        this.terminal.margin();
        this.terminal.echo(this.message.close.notEnoughFiles)
        this.closeWithoutTimer();
    }


    /**
     * close application with a message without copy found
     */
    closeWithoutCopy(){
        this.terminal.margin();
        this.terminal.echo(this.message.close.noCopy);
        this.closeWithTimer();
    }


    /**
     * close application with a message with timer
     */
    closeWithTimer(){
        this.terminal.margin(2);
        this.terminal.echoWithEndTimer(this.message.timer.processusFinished);
    }


    hardClose(){
        process.exit();
    }


    /**
     * if there were errors during the process
     * inform the user
     */
    wereThereAnyErrors(){
        const totalError = ErrorLog.getTotalError();
        if( totalError > 0 ){
            const errorWord = totalError === 1? 'error' : 'errors';
            const logFile = ErrorLog.getLogFilePath();

            this.terminal.margin();
            this.terminal.echoErrorMessage(`Il y a eu ${totalError} ${errorWord}.`);
            this.terminal.echoErrorMessage('Retrouver le rapport des erreurs dans le fichier :')
            this.terminal.echoErrorMessage(logFile);
            this.terminal.margin();
        }
    }


    close(code=0){
        process.emit('exit', code);
    }

}


module.exports = Process;