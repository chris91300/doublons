
const Terminal = require("./terminal/Terminal");
const MESSAGES = require('../configuration/messages/messages')



/**
 * @class Presentation
 * Display the presentation of the application
 * with title and a short presentation
 */
class Presentation{

    constructor(){
        this.terminal = Terminal;      
    }


    // display a short presentation of the application doublons
    displayPresentation(){
            this.terminal.echoH1(MESSAGES.presentation.title);
            this.terminal.echo(MESSAGES.presentation.presentation);
    }
}


module.exports = Presentation;