
const Terminal = require('../terminal/Terminal');
const fileTypes = require('./fileTypes');
const MESSAGES = require('../../configuration/messages/messages');

class FileTypesConfiguration{

    constructor(){
        this.terminal = Terminal;
        this.search = {
            picture: false,
            video: false,
            audio: false,
            document: false
        }
        
    }


    //  Ask for each type of file if application have to scan this type
    askForFileTypesToScan(){
        for (let type in fileTypes){
            this.askForType(type, fileTypes[type]);
        }
    }

    //  Ask if application must scan this type
    askForType(type, extensions){
        const extensionsText = extensions.join(", ");
        const answer = this.displayQuestionAndGetAnswer(type, extensionsText);
                        
        if( answer === ""){
            this.terminal.echoErrorMessage(MESSAGES.fileType.onlyAnswerYesOrNo);
            this.askForType(type, extensions);
        }else {
            this.setSearchType(type, answer);
        }
    }


    displayQuestionAndGetAnswer(type, extensionsText){
        this.terminal.echo(`${MESSAGES.fileType.questionLikeText} ${type} ?`);
        this.terminal.echo(`( ${ extensionsText } )`);
        let answer = this.terminal.questionTag(MESSAGES.fileType.question);

        return answer;
    }



    getExtensionsToScan(){
        let list = {};
        Object.entries(this.search).map( ([type, canScan]) =>{            
            if( canScan ){
                list[type] = fileTypes[type];
            }
        });
        
        return list;
    }


    setSearchType(type, answer){
        this.search[type] = answer;
    }
}


module.exports = FileTypesConfiguration;