
const CopyLog = require('../log/CopyLog');
const ErrorLog = require('../log/ErrorLog');
const Terminal = require('../terminal/Terminal');
const MESSAGES = require('../../configuration/messages/messages');
const moveFileFrom = require('./moveFileFrom');


/**
 * @class MoveFiles
 * Its role is to iterate a list of copies and transfer each copy from a directory to another
 */
class MoveFiles{
    constructor(){
        this.log = CopyLog;
        this.errorLog = ErrorLog;
        this.terminal = Terminal;
        this.progressBarName = 'copyMoveProgress';
    }


    /**
     * start to iterate the list of the copies found
     * and transfer each copy to from the original folder to the final folder
     * @param {object} list list of copies found
     * @param {number} totalCopies the total of copies found
     */
    async moveCopiesFound(list, totalCopies){
        this.terminal.margin(2);
        this.terminal.echoH3(MESSAGES.moveFiles.title); 
        this.terminal.setProgressBar(this.progressBarName, totalCopies);
        const addOneToProgressBar = this.getFunctionAddOneToProgressBar();
        const lengthList = Object.keys(list).length;

        await this.moveCopies(list, lengthList, addOneToProgressBar);
        
    }

    /**
     * return a function which add one to a progress bar
     * @returns {Function} the function add one to a progress bar
     */
    getFunctionAddOneToProgressBar(){
        return () => this.terminal.setOneToProgressBar(1, this.progressBarName);
    } 


    /**
     * iterate the list of the copies found
     * @param {object} list list of copies found
     * @param {number} totalCopies the total of copies found
     * @param {function} addOneToProgressBar add one to the progress bar
     */
    async moveCopies(list, lengthList, addOneToProgressBar){
        if( lengthList != 0 ){
            for( let originalFile in list ){
                const {fileTypeFolderPath, copyList} = list[originalFile];
                await this.log.addOriginalFile(originalFile, fileTypeFolderPath);

                for( let copyInformations of copyList ){
                    await this.moveFile(copyInformations, fileTypeFolderPath, addOneToProgressBar); 
                }
            }
        }
    }

    /**
     * transfer a copy to from the original folder to the final folder
     * @param {string} copyOriginalPath the path of the original copy
     * @param {string} fileType le type of file (audio, document, picture, video)
     */
     async moveFile({ copyOriginalPath, copyFinalPath, copyNameHasBeenModified }, fileTypeFolderPath, addOneToProgressBar){       
        try{ 
            await moveFileFrom(copyOriginalPath).to(copyFinalPath);
             this.log.writeEventInLog( fileTypeFolderPath, copyOriginalPath, copyFinalPath, copyNameHasBeenModified );
             addOneToProgressBar();
        }catch(err){
            const message = MESSAGES.moveFiles.error;
            this.errorLog.writeError(message, err, copyOriginalPath);
                         
        }finally{
         //  continue
         return true;
        }
      } 
 
}


module.exports = MoveFiles;