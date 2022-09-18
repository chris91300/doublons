
const {  appendFile, mkdir } = require('fs').promises;


/**
 * @class Log
 * Is an abstract class
 * Its role is to write message on a file
 */
class Log{

    constructor(){
        this.margeSmall = '\n';
        this.margeMiddle = '\n\n';
        this.margeBig = '\n\n\n';
        this.characterForLine = '*';
        this.totalCharacterForLine = 200;
    }

    /**
     * add to an empty sentence the symbol '*' as many time as the value of this.totalCharacterForLine
     * @returns {String} the line to write ( exemple => ****************** )
     */
    getLine(){
        let line = '';
        for( let i = 1; i <= this.totalCharacterForLine; i++){
            line += this.characterForLine;
        }

        return line;

    }

    /**
     * Write a message on a file
     * @param {String} logFilePath the path of the file where to write
     * @param {String} message the message to write
     */
    async write(logFilePath, message){
        try{            
            await appendFile(logFilePath, message);
        }catch(err){
            console.log(err)
        }finally{
            // continue
        }
        
    }
 
    /**
     * create a folder if it not exist
     * @param {String} path the folder path
     */
    async mkdirPath(path){
        await mkdir(path, {recursive: true});
    }
}


module.exports = Log;