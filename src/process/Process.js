
const Terminal = require("../terminal/Terminal");
const configMessages = require('../../configuration/messages/messages');
const configCodes = require('../../configuration/configCodes');
const ErrorLog = require("../log/ErrorLog");



class Process{
    constructor(){
        this.terminal = Terminal;
        this.message = configMessages;
        this.codes = configCodes;
    }

    startProcessIfApplicationisClose(){
        let _this = this;
        process.on('beforeExit', this.wereThereAnyErrors.bind(_this))
        process.on("exit", this.closeApplication.bind(_this))
    }

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

    closeWithoutTimer(){
        this.terminal.echo('\n\n');
        this.terminal.echo(this.message.close.withoutTimer);
    }


    closeWithNotEnoughFile(){
        this.terminal.echo('\n');
        this.terminal.echo(this.message.close.notEnoughFiles)
        this.closeWithoutTimer();
    }


    closeWithoutCopy(){
        this.terminal.echo('\n');
        this.terminal.echo(this.message.close.noCopy);
        this.closeWithTimer();
    }

    closeWithTimer(){
        this.terminal.echo('\n\n');
        this.terminal.echoWithEndTimer(this.message.timer.processusFinished);
    }


    hardClose(){
        process.exit();
    }


    wereThereAnyErrors(){
        const totalError = ErrorLog.getTotalError();
        if( totalError > 0 ){
            const errorWord = totalError === 1? 'error' : 'errors';
            const logFile = ErrorLog.getLogFilePath();

            this.terminal.echo('\n');
            this.terminal.echoErrorMessage(`Il y a eu ${totalError} ${errorWord}.`);
            this.terminal.echoErrorMessage('Retrouver le rapport des erreurs dans le fichier :')
            this.terminal.echoErrorMessage(logFile);
            this.terminal.echo('\n');
        }
    }


    close(code=0){
        process.emit('exit', code);
    }

}


module.exports = Process;