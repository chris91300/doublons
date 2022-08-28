
const chalk = require('chalk');
const terminal = require('readline-sync');
const ProgressBar = require('progress');

let instance;
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


    question(question){
        const answer = this.terminal.question(chalk.green(question));
        return answer;
    }

    questionTag(question){        
        const answer = this.terminal.keyInYN(question);
        return answer;

    }

    questionWithChoice(question, list, options){        
        let choice = this.terminal.keyInSelect(list, question, options);      
        return choice;
    }


    echo(...arg){
        console.log(...arg);
    }

    echoH1(title){     
        console.log("\n")
        console.log(chalk.magenta.bold("\t\t\t", title.toUpperCase()))
        console.log("\n")
    }

    echoH2(title){        
        console.log(chalk.magenta("\t", title.toUpperCase()))
    }

    echoH3(title){        
        console.log(chalk.magenta("\t", this.firstLetterToUpperCase(title)))
    }


    echoWithStartTimer(sentence){
        console.time(sentence);
    }


    echoWithEndTimer(sentence){
        console.timeEnd(sentence);
    }


    firstLetterToUpperCase(sentence){
        return sentence[0].toUpperCase() + sentence.slice(1);;
    }

    

    echoErrorMessage(message){
        console.log(chalk.red(message));
    }

    // a réécrire terminal ne doit pas écrire de log
    echoErrorMessageAndWriteLog(error){
        console.log(chalk.red(error.message));
    }

    margin(number=1){        
        const margin = this.getMargin(number);
        console.log(margin)
    }


    getMargin(number){
        let margin = "";
        while(number > 0){
            margin += "\n";
            number--;
        }
        
        return margin;
    }


    setProgressBar(name, length){
        this.progressBar[name] = new ProgressBar(' [:bar] :percent ', {
            complete: '=',
            incomplete: ' ',
            width: this.widthProgressBar,
            total: length
          });
         // console.log("nombre de commparaison "+length)
    }

    setOneToProgressBar(number, name){
        if( this.progressBarExist(name) && number > 0 ){        
            this.progressBar[name].tick(number);   
        }
    }


    progressBarExist(name){
        return this.progressBar[name]? true : false;
    }

   

}


module.exports = new Terminal();