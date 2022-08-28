//const fs = require('fs');
const getOsComputer = require("../os/getOsComputer");
const Terminal = require("../terminal/Terminal");
const config = require('../../configuration/config');
const FileTypesConfiguration = require('./FileTypesConfiguration');
const FoldersListConfiguration = require('./FoldersConfiguration');
const NameConfiguration = require('./NameConfiguration');
const searchOptionConfiguration = require('./searchOptionConfiguration');
const MESSAGES = require('../../configuration/messages/messages');


let instance;

/**
 * @class Configuration
 * ask to the user all informations the application need to work
 */
class Configurations{

    constructor(){
        if(instance){
            throw new Error('Une instance de Terminal a déjà été créée.')
        }
        instance = this;

        this.folderRapportName = config.folderRapportName;       
        this.nameConfig = new NameConfiguration();
        this.searchOptionConfig = new searchOptionConfiguration();
        this.foldersConfig = new FoldersListConfiguration();
        this.fileTypesConfig = new FileTypesConfiguration();
        this.terminal = Terminal;
        this.osComputer; 
        this.directoriesList = [];
        
    }

    /**
     * get all the configuration (choice) of the user
     */
    init(){
        this.getOsComputer();
        this.askUserName();
       // this.getPathToDesktop();
        this.askSearchOption();
        this.askDirectoriesList();
        this.askFileTypes();        
    }


    getOsComputer(){
        this.osComputer = getOsComputer();
    }

    /**
     * ask the user name
     */
    askUserName(){
        
        this.nameConfig.askUserName();
        const name = this.nameConfig.getUserName();
        if( name === "" ){
            this.terminal.echoErrorMessage(MESSAGES.userName.error);
            this.terminal.margin();
            this.askUserName();
        }

        this.getPathToDesktop();
    }


    /**
     * get the user desktop path with the user name.
     * if the path not exist
     * ask the userName
     */
    getPathToDesktop(){
        let pathExist;
        let userName = this.nameConfig.getUserName();
        pathExist = this.osComputer.getPathToDesktop(userName);
        
        if ( !pathExist ){
            this.askUserName();
        }
    }

    /**
     * ask user to choose an options for to know which folders to scan
     */
    askSearchOption(){
        this.searchOptionConfig.askSearchOption();
    }


    
    /**
     * ask to user the path of the folder or folders to scan
     */
    askDirectoriesList(){        
        let option = this.searchOptionConfig.getSearchChoise();
        let os = this.osComputer.getOS();
        let desktopPath = this.osComputer.getDesktopPath();
        
        this.foldersConfig.askFoldersWhereToSearch(option, os, desktopPath);// on en est là
        
       
    }


    //  ask to the user the type of file the app have to scan
    askFileTypes(){
        this.fileTypesConfig.askForFileTypesToScan();
    }
    

    getUserName(){        
        return this.nameConfig.getUserName();
    }

    getDesktopPath(){
        return this.osComputer.getDesktopPath()
    }


    getFoldersList(){
        return this.foldersConfig.getFoldersList();
    }

    getExtensionsToScan(){
        return this.fileTypesConfig.getExtensionsToScan();
    }


    getFolderRapportName(){
        return this.folderRapportName;
    }
    
}

module.exports = new Configurations();