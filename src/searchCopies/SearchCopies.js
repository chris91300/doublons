const CompareControler = require("../compare/CompareControler");
const Terminal = require("../terminal/Terminal");
const MESSAGES = require('../../configuration/messages/messages');


/**
 * @class SearchCopies
 * Its role is to extract the list of files with the same type and same extension
 * and give this list to the CompareController
 */
class SearchCopies{

    constructor(){
        this.terminal = Terminal;
        this.compareControler = new CompareControler();
    }


    /**
     * start to compare and find copies
     * @param {Object} files list of files to compare
     */
    async start(files){
        this.displayTitle();

        for(let fileType in files){
            const extensions = files[fileType];
            await this.searchInThisFileType( fileType, extensions ) ;
        }
    }

    /**
     * Display the title of this part of the process
     */
    displayTitle(){
        this.terminal.echoH2(MESSAGES.search.title);
    }

    /**
     * search files with the same extension
     * @param {String} fileType 
     * @param {Object} extensions 
     */
    async searchInThisFileType( fileType, extensions ){
        this.displayMessageStartAnalise(fileType);

        for(let ext in extensions){
            const extensionsList = extensions[ext];
            await this.searchInThisExtension( ext, extensionsList, fileType ) 
        }

        this.displayMessageEndAnalise(fileType);

        
    }



    /**
     * Display the message for the start of analise for file type 
     * @param {String} fileType 
     */
    displayMessageStartAnalise(fileType){
        this.terminal.margin();
        this.terminal.echoH3(`Analyse des fichiers de type ${fileType}`);
        this.terminal.echoWithStartTimer(`${MESSAGES.timer.analyseFileType} ${fileType}`)
    }


    /**
     * give to the CompareController the list of files to compare
     * @param {String} extension 
     * @param {Object} files 
     * @param {String} fileType 
     */
   async searchInThisExtension( extension, files, fileType ){
        this.terminal.echo(`\nComparaison des fichiers avec l'extension ${extension}`);             
        this.terminal.echoWithStartTimer(`${MESSAGES.timer.analyseFileExtension} ${extension}`)        
        
        await this.compareControler.compareFiles(files, fileType, extension);
        this.terminal.echoWithEndTimer(`${MESSAGES.timer.analyseFileExtension} ${extension}`); 
    }


    /**
     * Display the message for the end of analise for file type 
     * @param {String} fileType 
     */
    displayMessageEndAnalise(fileType){
        this.terminal.echoWithEndTimer(`${MESSAGES.timer.analyseFileType} ${fileType}`)
    }


    /**
     * return the total of copies found
     * @returns {Number} the total of copies found
     */
    getTotalCopies(){
        return this.compareControler.getTotalCopies();
    }
}

module.exports = SearchCopies;