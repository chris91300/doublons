const fs = require('fs');
const Terminal = require('../../terminal/Terminal');
const MESSAGES = require('../../../configuration/messages/messages');

/**
 * @class AllOS
 * its an abstract class
 * 
 */
class AllOS{
    constructor(os){
        this.terminal = Terminal;
        this.desktopPath = '';
        this.os = os;
    }
   

    setDesktopPath(path){
        this.desktopPath = path;
    }


    //TODO à modifier not unique function
    /**
     * verify if user folder path and desktop path exist
     * @param {String} pathToUserFolder 
     * @returns {Boolean} if path exist
     */
    getUserFolderAndDesktopFolder(pathToUserFolder){
        let pathExist = this.pathExist(pathToUserFolder);

        if( pathExist ){ 

            pathExist = this.getPathToUserDesktop(pathToUserFolder); 
            return pathExist  

        } else {
            this.displayErrorUserName();
            return false;
        }
    }

   

    /**
     * try to get the desktop path of the user
     * first in french
     * and if the french path not exist, in english
     * @param {String} path the user folder path
     * @returns {Boolean} if the path exist or not
     */
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

    /**
     * add the desktop folder in french to the user folder path
     * @param {String} path the user folder path
     * @returns {String} the desktop path in french
     */
    getPathToUserDesktopFR(path){
        return `${path}/Bureau`;
    }

    /**
     * 
     * @param {String} path the desktop path in french 
     * @returns {String} the desktop path in english
     */
    getPathToUserDesktopEN(path){
        return path.replace("Bureau", "Desktop");
    }

    getOS(){
        return this.os;
    }

    getDesktopPath(){
        return this.desktopPath;
    }


    /**
     * verify if a path exist
     * @param {String} path the path to verify 
     * @returns {Boolean} if the path exist or not
     */
    pathExist(path){        
        const exist = fs.existsSync(path);
        return exist;
    }


    /**
     * display in the terminal an error message
     * because the user folder path is not valid
     * because the user name is not valid
     */
    displayErrorUserName(){
        this.terminal.echoErrorMessage(MESSAGES.os.error.userName);
    }


    /**
     * display in the terminal an error message
     * because the desktop path is not valid
     */
    displayErrorDesktop(){
        this.terminal.echoErrorMessage(MESSAGES.os.error.desktopPath);
    }
}


module.exports = AllOS;