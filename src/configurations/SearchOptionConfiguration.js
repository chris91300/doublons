
const Terminal = require("../terminal/Terminal");
const MESSAGES = require('../../configuration/messages/messages');
const configCodes = require("../../configuration/configCodes");


/**
 * @class SearchOptionConfiguration
 * Its role is to ask to the user if he want the application search 
 * 1 - his desktop folder
 * 2 - in one folder
 * 3 - in several folder
 */
class  SearchOptionConfiguration{
    constructor(){
        this.terminal = Terminal;
        this.searchOptions = [
            MESSAGES.folderToScan.userChosen.desktop, 
            MESSAGES.folderToScan.userChosen.oneFolder,
            MESSAGES.folderToScan.userChosen.severalFolder
        ]
        this.searchChoice;
    }


    // offers search options
    askSearchOption(){
        
        const options = {cancel: MESSAGES.folderToScan.cancelOption}
        const choice = this.terminal.questionWithChoice(
            MESSAGES.folderToScan.question,
            MESSAGES.folderToScan.choices,
            options
            );
        
        if( choice === -1){
            this.terminal.echoErrorMessage( MESSAGES.folderToScan.cancelWithClose )
            process.exit(configCodes.closeWithoutTimer)
        }else{
            this.setSearchChoise(choice);
        }

    }


    setSearchChoise(choice){
        this.searchChoice = this.searchOptions[choice];
    }

    getSearchChoise(){
        return this.searchChoice;
    }
}


module.exports = SearchOptionConfiguration;