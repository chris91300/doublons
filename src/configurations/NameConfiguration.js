
const Terminal = require("../terminal/Terminal");
const MESSAGES = require('../../configuration/messages/messages');

/**
 * @class NameConfiguration
 * Its role is to ask and get the user name
 */
class NameConfiguration{
    constructor(){
        this.terminal = Terminal;
        this.userName;
    }

    // ask the user name 
    askUserName(){
        this.terminal.echo(MESSAGES.userName.information);
        let userName = this.terminal.question(MESSAGES.userName.question);
        this.setUserName(userName);
    }

    setUserName(name){        
        this.userName = name;
    }

    getUserName(){
        return this.userName;
    }
}


module.exports = NameConfiguration;


