const CompareControler = require("../compare/CompareControler");
const Terminal = require("../terminal/Terminal");
const MESSAGES = require('../../configuration/messages/messages');


class SearchCopies{

    constructor(){
        this.terminal = Terminal;
        this.compareControler = new CompareControler();
    }


    async start(files){
        this.terminal.echoH2(MESSAGES.search.title);

        for(let fileType in files){
            const extensions = files[fileType];
            await this.searchInThisFileType( fileType, extensions ) ;
        }
    }


    async searchInThisFileType( fileType, extensions ){
        this.terminal.margin();
        this.terminal.echoH3(`Analyse des fichiers de type ${fileType}`);
        this.terminal.echoWithStartTimer(`${MESSAGES.timer.analyseFileType} ${fileType}`)

        for(let ext in extensions){
            const extensionsList = extensions[ext];
            await this.searchInThisExtension( ext, extensionsList, fileType ) 
        }
        this.terminal.echoWithEndTimer(`${MESSAGES.timer.analyseFileType} ${fileType}`)

        
    }


   async searchInThisExtension( extension, files, fileType ){
        this.terminal.echo(`\nComparaison des fichiers avec l'extension ${extension}`);             
        this.terminal.echoWithStartTimer(`${MESSAGES.timer.analyseFileExtension} ${extension}`)        
        
        await this.compareControler.compareFiles(files, fileType, extension);
        this.terminal.echoWithEndTimer(`${MESSAGES.timer.analyseFileExtension} ${extension}`); 
    }


    getTotalCopies(){
        return this.compareControler.getTotalCopies();
    }
}

module.exports = SearchCopies;