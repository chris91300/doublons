
const fs = require('fs');
const Terminal = require("../terminal/Terminal");
const MESSAGES = require('../../configuration/messages/messages');


/**
 * @class FoldersConfiguration
 * Its role it's to get folder where the application must search copies
 */
class FoldersConfiguration{

    constructor(){
        this.terminal = Terminal;
        this.foldersList = [];
    }


    /**
     * ask to the user in which folder(s) the application can search doublons
     * @param {String} option the option choice by user
     * @param {String} os os computer
     * @param {String} desktopPath 
     */
     askFoldersWhereToSearch(option, os, desktopPath){
       
        switch(option){ 

            case MESSAGES.folderToScan.userChosen.desktop:
                this.addDesktopPathInFoldersList(desktopPath);                
                break;
            
            case MESSAGES.folderToScan.userChosen.oneFolder:
                this.askTheFolder(os);
                break;

            case MESSAGES.folderToScan.userChosen.severalFolder:
                this.askFolders(os);
                break;

            default:
                throw new Error(MESSAGES.folderToScan.userChosen.noChoice);
        }

    }


    // set the desktop path to the list of folders
    addDesktopPathInFoldersList(desktopPath){
        if ( this.pathIsValid(desktopPath) ){
            this.setFolderInList(desktopPath);
        }else{
            throw new Error(MESSAGES.selectedFolder.pathNoValid);
        }
    }



    /**
     * ask the unique folder where the application can search
     * @param {String} os os computer
     */
    askTheFolder(os){
        this.terminal.echo(MESSAGES.selectedFolder.choosen.oneFolder.text);
        this.echoPathExemple(os);
        let path = this.terminal.question(MESSAGES.selectedFolder.choosen.oneFolder.question);
        path = this.getEnglishPath(path);
        
        if ( this.pathIsValid(path) ){
            this.setFolderInList(path);
        }else{
            this.askTheFolder(os);
        }
    }    

    

    /**
     * ask folders where the application can search
     * @param {String} os os computer
     */
    askFolders(os){
        let totalDirectories = 1;
        let askDirectory = true;
        this.terminal.echo(MESSAGES.selectedFolder.choosen.severalFolder.text);
        this.echoPathExemple(os);

        while( askDirectory ){
            const question = `${MESSAGES.selectedFolder.choosen.severalFolder.question} ${totalDirectories} (Q pour finir): `;
            let path = this.terminal.question(question);
            if( path === 'Q' | path === 'q'){
                askDirectory = false;
            } else {
                path = this.getEnglishPath(path);
                
                if( this.pathIsValid(path) ){
                    this.setFolderInList(path)
                    totalDirectories++;
                }                
            }
        }
    }


    // ask to the terminal to show an exemple of folder path pattern in terms of os 
    // TODO MODIFIER ICI => METTRE LE SWITCH DANS OS COMPUTER
    echoPathExemple(os){
        let exemple = 'Exemple : ';
        switch(os){

            case 'windows':
                exemple += MESSAGES.selectedFolder.exemple.forWindows;
                break;

            case 'mac':
                exemple += MESSAGES.selectedFolder.exemple.forMac;
                break;

            case 'linux':
                exemple += MESSAGES.selectedFolder.exemple.forLinux;
                break;

            default:
                throw new Error("Une erreur inconnue est survenue. Il semblerait qu'il y ait un problème avec votre OS.")
        }
        this.terminal.echo(exemple);
    }


    /**
     * translate french path for english path
     * @param {String} path path folder
     * @returns {String} the path translated
     */
    getEnglishPath(path){
        path = path.replace("C:/Utilisateurs", "C:/Users");
        path = path.replace("C:/Programmes", "C:/Program Files");
        return path;
    }


    /**
     * Verify if the path exist
     * @param {String} path 
     * @returns {Boolean} if the path exist
     */
    pathIsValid(path){
        let pathIsValid = false;
        if ( fs.existsSync(path) ){
            pathIsValid = true;
        }else{
            this.terminal.echoErrorMessage(MESSAGES.selectedFolder.pathNoValid);
        }

        return pathIsValid;
    }


    /**
     * add the path to the list of folder to scan
     * @param {String} path the path folder
     */
    setFolderInList(path){
        this.foldersList.push(path);
    }


    /**
     * @returns {Object} the folder list to scan
     */
    getFoldersList(){
        return this.foldersList;
    }
}


module.exports = FoldersConfiguration;