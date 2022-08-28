
const Terminal = require("../terminal/Terminal");
const MESSAGES = require('../../configuration/messages/messages')

class  searchOptionConfiguration{
    constructor(){
        this.terminal = Terminal;
        this.searchOptions = [
            MESSAGES.folderToScan.userChosen.desktop, 
            MESSAGES.folderToScan.userChosen.oneFolder,
            MESSAGES.folderToScan.userChosen.severalFolder
        ]
        this.searchChoice;
    }


    // demande dans quel(s) dossier(s) on cherche
    askSearchOption(){
        
        const options = {cancel: MESSAGES.folderToScan.cancelOption}
        const choice = this.terminal.questionWithChoice(
            MESSAGES.folderToScan.question,
            MESSAGES.folderToScan.choices,
            options
            );
        
        if( choice === -1){
            this.terminal.echoErrorMessage( MESSAGES.folderToScan.cancelWithClose )
            process.exit(50)
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


module.exports = searchOptionConfiguration;