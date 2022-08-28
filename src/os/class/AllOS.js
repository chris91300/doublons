const fs = require('fs');
const Terminal = require('../../terminal/Terminal');
const MESSAGES = require('../../../configuration/messages/messages');
 
class AllOS{
    constructor(os){
        this.terminal = Terminal;
        this.desktopPath = '';
        this.os = os;
    }
   

    setDesktopPath(path){
        this.desktopPath = path;
    }

   

    getPathToUserDesktop(path){
        let pathExist = true;
        path = this.getPathToUserDesktopFR(path);
        if( !this.pathExist(path) ){
            path = this.getPathToUserDesktopEN(path);
            if( !this.pathExist(path) ){
                this.displayErrorDesktop();
                pathExist = false;
            }
        }

        if (pathExist){
            this.setDesktopPath(path);
        }
        
        return pathExist;

    }

    getPathToUserDesktopFR(path){
        return `${path}/Bureau`;
    }

    getPathToUserDesktopEN(path){
        return path.replace("Bureau", "Desktop");
    }

    getOS(){
        return this.os;
    }

    getDesktopPath(){
        return this.desktopPath;
    }

    pathExist(path){        
        const exist = fs.existsSync(path);
        return exist;
    }

    displayErrorUserName(){
        this.terminal.echoErrorMessage(MESSAGES.os.error.userName);
    }

    displayErrorDesktop(){
        this.terminal.echoErrorMessage(MESSAGES.os.error.desktopPath);
    }
}


module.exports = AllOS;