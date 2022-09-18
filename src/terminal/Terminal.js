
const chalk = require('chalk');
const terminal = require('readline-sync');
const ProgressBar = require('progress');

let instance;

/**
 * @class Terminal
 * its role is to interact with the terminal to display information or ask questions to the user
 */
class Terminal{

    constructor(){
        if(instance){
            throw new Error('Une instance de Terminal a déjà été créée.')
        }
        this.terminal = terminal;
        this.progressBar = {};
        this.widthProgressBar = 20;
        instance = this;
        
    }


    /**
     * ask a simple question
     * @param {string} question 
     * @returns {string} the answer to the question
     */
    question(question){
        const answer = this.terminal.question(chalk.green(question));
        return answer;
    }

    /**
     * asks a question to be answered yes or no
     * @param {string} question 
     * @returns {string} the answer to the question
     */
    yesNoQuestion(question){        
        const answer = this.terminal.keyInYN(question);
        return answer;

    }

    /**
     * Ask a question with choice
     * the user must choice between the options
     * @param {String} question 
     * @param {Object} list an array with the differents choices for the user
     * @param {Object} options for the method called
     * @returns {Number} the number of the user choice ( get -1 if user cancel )
     */
    questionWithChoice(question, list, options){        
        let choice = this.terminal.keyInSelect(list, question, options);      
        return choice;
    }


    /**
     * display a simple message
     * @param  {...any} arg arguments for the method console.log
     */
    echo(...arg){
        console.log(...arg);
    }

    /**
     * Display a title with the level 1 
     * @param {String} title 
     */
    echoH1(title){     
        this.echo("\n")
        this.echo(chalk.magenta.bold("\t\t\t", title.toUpperCase()))
        this.echo("\n")
    }


    /**
     * Display a title with the level 2 
     * @param {String} title 
     */
    echoH2(title){        
        this.echo(chalk.magenta("\t", title.toUpperCase()))
    }

    /**
     * Display a title with the level 3 
     * @param {String} title 
     */
    echoH3(title){        
        this.echo(chalk.magenta("\t", this.firstLetterToUpperCase(title)))
    }


    /**
     * Start a timer in order to know how much time the application have done to do his job
     * @param {String} sentence the sentence to display when we will call console.timeEnd
     */
    echoWithStartTimer(sentence){
        console.time(sentence);
    }


    /**
     * Stop a timer in order to know how much time the application have done to do his job
     * @param {String} sentence the sentence to display with the time it
     * took for the application to do its job
     */
    echoWithEndTimer(sentence){
        console.timeEnd(sentence);
    }


    /**
     * get a sentence and return the same sentence with the first letter to upper case
     * @param {String} sentence 
     * @returns {String} the sentence with the first letter to upper case
     */
    firstLetterToUpperCase(sentence){
        return sentence[0].toUpperCase() + sentence.slice(1);
    }

    

    /**
     * Display an error message in red
     * @param {String} message 
     */
    echoErrorMessage(message){
        this.echo(chalk.red(message));
    }

    // a réécrire terminal ne doit pas écrire de log
    echoErrorMessageAndWriteLog(error){
        this.echo(chalk.red(error.message));
    }

    /**
     * Display a margin
     * A space between an information with an another
     * @param {Number} number the number of space between informations
     */
    margin(number=1){        
        const margin = this.getMargin(number);
        this.echo(margin)
    }


    /**
     * while the number is over 0, add one space to the margin
     * @param {Number} number the number f iteration
     * @returns {String} the margin to display
     */
    getMargin(number){
        let margin = "";
        while(number > 0){
            margin += "\n";
            number--;
        }
        
        return margin;
    }


    /**
     * Initialise a progress bar
     * @param {String} name the name ( ID ) of the progress bar
     * @param {*} length the width of the progress bar
     */
    setProgressBar(name, length){
        this.progressBar[name] = new ProgressBar(' [:bar] :percent ', {
            complete: '=',
            incomplete: ' ',
            width: this.widthProgressBar,
            total: length
          });
    }


    /**
     * add a quantity to a progress bar
     * @param {Number} number quantity to add to the progress bar
     * @param {String} name the name ( ID ) of the progress bar
     */
    setOneToProgressBar(number, name){
        if( this.progressBarExist(name) && number > 0 ){        
            this.progressBar[name].tick(number);   
        }
    }


    /**
     * Verify if a progress bar exist
     * @param {String} name the name ( ID ) of the progress bar
     * @returns 
     */
    progressBarExist(name){
        return this.progressBar[name]? true : false;
    }

   

}


module.exports = new Terminal();