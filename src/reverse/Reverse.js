
const path = require('path');
const history = require('../copyController/history.json');
const fileExist = require('../utils/fileExist');
const moveFileFrom = require('../move/moveFileFrom');
const Terminal = require('../terminal/Terminal');
const MESSAGES = require('../../configuration/messages/messages');


/**
 * @class Reverse
 * its role is to put the copies found the last time the application was launched in their original folder
 */
class Reverse{

    constructor(){
        
        this.history = history;
        this.totalErrors = 0;
        this.start()
    }


    /**
     * start to remove all copies found in each original folder
     */
    start(){

        this.displayPresentation();
        this.reverse();
        this.displayEnd();
    }


    /**
     * displays the welcome message
     */
    displayPresentation(){
        Terminal.echo(MESSAGES.reverse.presentation);
    }


    /**
     * move all copies of the history list
     */
    reverse(){
        Object.entries(this.history).map( ([ file, dataFile ]) => {
            const { copyList } = dataFile;

            copyList.map(async ({ copyOriginalPath, copyFinalPath }) => {
                
                if(  fileExist(copyFinalPath)){
                    await this.removeCopy( copyOriginalPath, copyFinalPath );
                } 
            })
        })
    }


    /**
     * Check if the original path of the copy (folder where the copy will be remove) already exist
     * if path already exist, application have to modify the name of the copy before remove it
     * else remove it
     * @param {String} copyOriginalPath 
     * @param {String} copyFinalPath 
     */
    async removeCopy(copyOriginalPath, copyFinalPath){
         if( fileExist( copyOriginalPath ) ){
            copyOriginalPath = this.getNewName( copyOriginalPath );
        }

        await this.moveFile(copyOriginalPath, copyFinalPath);
        
    }


    /**
     * move a file from a folder to another
     * @param {String} copyOriginalPath 
     * @param {String} copyFinalPath 
     */
    async moveFile(copyOriginalPath, copyFinalPath){
        try{
            await moveFileFrom(copyFinalPath).to(copyOriginalPath);
        }catch(err){
            this.errors++;
        }finally{
            // continu
        }
        
    }


    /**
     * modify the name of the original copy path
     * @param {String} file 
     * @returns {String} the new path with the copy name modified
     */
    getNewName(file){
        let ext = path.extname(file);
        let baseName = path.basename(file, ext);
        let folder = path.dirname(file);
        let compteur = 1;

        while( fileExist(file)){
            let name = `${ baseName }(${ compteur })${ ext }`;
            file = `${folder}/${name}`;
            compteur++;
        }


        return file;

    }

    /**
     * displays the end of process message
     */
    displayEnd(){
        if(this.errors > 0){
            this.displayErrorsMessage();
        }

        Terminal.margin();
        Terminal.echo(MESSAGES.reverse.end);
    }


    /**
     * displays the error message
     */
    displayErrorsMessage(){
        Terminal.margin();
        Terminal.echo(MESSAGES.reverse.end);
    }
}


module.exports = Reverse;