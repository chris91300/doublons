
const fs = require('fs');
const Terminal = require("../terminal/Terminal");
//const OPTIONS_FOLDERS = require('../../configuration/configOptionsFolderToScan');
//const MESSAGES = require('../../configuration/configMessages');
const MESSAGES = require('../../configuration/messages/messages');

class FoldersConfiguration{

    constructor(){
        this.terminal = Terminal;
        this.foldersList = [];
    }


    /**
     * ask to the user in which folder(s) the application can search doublons
     * @param {*} option 
     * @param {*} os 
     * @param {*} desktopPath 
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
        let pathIsValid = this.setFolderInList(desktopPath);
        if ( !pathIsValid){
            throw new Error(MESSAGES.selectedFolder.pathNoValid);
        }
    }


    // ask the unique folder where the application can search
    askTheFolder(os){
        this.terminal.echo(MESSAGES.selectedFolder.choosen.oneFolder.text);
        this.echoPathExemple(os);
        let path = this.terminal.question(MESSAGES.selectedFolder.choosen.oneFolder.question);
        path = this.getEnglishPath(path);
        let pathIsValid = this.setFolderInList(path);
        
        if ( !pathIsValid ){
            this.askTheFolder(os);
        }
    }    

    

// ask folders where the application can search
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
                let pathIsValid = this.setFolderInList(path);
                if( pathIsValid ){
                    totalDirectories++;
                }                
            }
        }
    }


    // ask to the terminal to show an exemple of folder path pattern in terms of os 
    // MODIFIER ICI => METTRE LE SWITCH DANS OS COMPUTER
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


    getEnglishPath(path){
        path = path.replace("C:/Utilisateurs", "C:/Users");
        path = path.replace("C:/Programmes", "C:/Program Files");
        return path;
    }


    setFolderInList(path){
        let pathExist = false;

        if ( fs.existsSync(path) ){

            this.foldersList.push(path);
            pathExist = true;

        } else {

            this.terminal.echoErrorMessage(MESSAGES.selectedFolder.pathNoValid);            
            
        }

        return pathExist;
        
    }


    getFoldersList(){
        return this.foldersList;
    }
}


module.exports = FoldersConfiguration;