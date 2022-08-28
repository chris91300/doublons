
const Log = require("../log/Log");
const { rename } = require('fs').promises;

class Move{

    constructor(){
        this.log = Log;
    }

    /**
     * transfère un fichier d'un dossier vers un autre
     * @param {string} originalFile le fichier original
     * @param {string} copyOriginalPath la copie du fichier original
     * @param {string} fileType le type de fichier des fichiers (audio, document, picture, video)
     */
    async moveFile(originalFile, { copyOriginalPath, copyFinalPath, copyNameHasBeenModified }, fileTypeFolderPath, ItProgressed){       
       try{   
            await rename(copyOriginalPath, copyFinalPath);
            Log.writeEventInLog( fileTypeFolderPath, originalFile, copyOriginalPath, copyFinalPath, copyNameHasBeenModified );
            ItProgressed();
       }catch(err){
            this.whriteError();            
       }finally{
        //  continue
        return true;
       }
     }


    //  avertie par un message dans la console qu'il y a eu un problème avec un fichier
    whriteError(){
        this.terminal.margin();
        this.terminal.echoErrorMessage(MESSSAGES.error.move.messageBeforePath);
        this.terminal.echoErrorMessage(copyOriginalPath);
        this.terminal.echoErrorMessage(MESSSAGES.error.move.messageAfterPath)
        this.terminal.margin();
    }

}



module.exports = Move;