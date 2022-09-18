
const Terminal = require('../terminal/Terminal');
const fileTypes = require('./fileTypes');
const MESSAGES = require('../../configuration/messages/messages');

/**
 * @class FileTypesConfiguration
 * Its role it's to get the type of file the application must to scan 
 * in order to fine copies
 */
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


    /**
     * Ask if application must scan this type
     * @param {String} type the type of file ( audio, document, picture, video )
     * @param {Object} extensions the list of extension for the type of file
     */
    askForType(type, extensions){
        const extensionsText = extensions.join(", ");
        const answer = this.shouldScanThisType(type, extensionsText);
                        
        if( answer === ""){
            this.terminal.echoErrorMessage(MESSAGES.fileType.onlyAnswerYesOrNo);
            this.askForType(type, extensions);
        }else {
            this.setSearchType(type, answer);
        }
    }


    /**
     * Ask to the user if the application should scan this type of file
     * @param {String} type the type of file ( audio, document, picture, video )
     * @param {String} extensionsText the list of extensions to display to the user
     * @returns {Boolean} yes -> True or no -> False
     */
    shouldScanThisType(type, extensionsText){
        this.terminal.echo(`${MESSAGES.fileType.questionLikeText} ${type} ?`);
        this.terminal.echo(`( ${ extensionsText } )`);
        let answer = this.terminal.yesNoQuestion(MESSAGES.fileType.question);

        return answer;
    }


    /**
     * Return the list of type of file the application must scan
     * @returns {Object} list of type of file the application must scan
     */
    getExtensionsToScan(){
        let list = {};
        Object.entries(this.search).map( ([type, canScan]) =>{            
            if( canScan ){
                list[type] = fileTypes[type];
            }
        });
        
        return list;
    }


    /**
     * set to the search object the answer of the question : should scan this type ?
     * @param {String} type the type of file ( audio, document, picture, video )
     * @param {Boolean} answer the answer of the question : should scan this type ?
     */
    setSearchType(type, answer){
        this.search[type] = answer;
    }
}


module.exports = FileTypesConfiguration;