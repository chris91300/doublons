
const {  appendFile, mkdir } = require('fs').promises;

class Log{

    constructor(){
        this.margeSmall = '\n';
        this.margeMiddle = '\n\n';
        this.margeBig = '\n\n\n';
        this.characterForLine = '*';
        this.totalCharacterForLine = 200;
    }

    getLine(){
        let line = '';
        for( let i = 1; i <= this.totalCharacterForLine; i++){
            line += this.characterForLine;
        }

        return line;

    }

    async write(logFilePath, message){
        await appendFile(logFilePath, message);
    }

    async mkdirPath(path){
        await mkdir(path, {recursive: true});
    }
}


module.exports = Log;