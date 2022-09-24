
const getDate = require('./date/getDate');
const Terminal = require('./terminal/Terminal');
const Configurations = require("./configurations/Configurations");
const MESSAGES = require('../configuration/messages/messages');
const CODE = require('../configuration/configCodes');
const Presentation = require("./Presentation");
const Scan = require('./scan/Scan');
const SearchCopies = require('./searchCopies/SearchCopies');
const Process = require('./process/Process');
const CopyController = require('./copyController/CopyController');
const MoveFiles = require('./move/MoveFiles');
const ErrorLog = require('./log/ErrorLog');


/**
 * @class DoublonsApp
 * This is the main class.
 * It controle all the application.  
 */
class DoublonsApp {

    constructor(){
        this.date = getDate();
        this.terminal = Terminal;
        this.process = new Process();
        this.presentation = new Presentation();
        this.configurations = Configurations;
        this.scan = new Scan();
        this.searchCopies = new SearchCopies();
        this.moveFiles = new MoveFiles();
        
        this.startListenEventExitApplication();
    }

    
    /**
     * add an event when the application exit
     */
    startListenEventExitApplication(){
        this.process.startListenEventExitApplication();
    }


    /**
     * Start the application
     * 1 - display the welcome message
     * 2 - get informations about user
     * 3 - scan folders and search copies
     */
    async start(){         
        this.displayPresentation();
        await this.getConfigurations();
        await this.scanFolders();
        this.displayInformationsAboutFilesFound();
        this.startTimerForAnalyse();
        await this.startToSearchCopies();
        await this.writeHistory();
        await this.moveCopies();
        this.displayEnd();
    }


    /**
     * display the welcome message
     */
    displayPresentation(){
        this.presentation.displayPresentation();
        
    }

    /**
     * get informations about user
     */
    async getConfigurations(){
        await this.configurations.init();
    }


    /**
     * scan folders and search copies
     */
    async scanFolders(){
        const folders = this.configurations.getFoldersList();
        const extensions = this.configurations.getExtensionsToScan();

        await this.scan.scanFolders(folders, extensions);        
    }


    /**
     * display informations about how many files the application found
     */
    displayInformationsAboutFilesFound(){        
        this.displayTotalFilesFound();
        this.displayTotalOfEachType();
    }


    /**
     * display the total files found
     */
    displayTotalFilesFound(){
        let totalFilesFound = this.scan.getTotalFilesFound();
        this.terminal.echo(`Nombre total de fichier trouvé : ${totalFilesFound}`);
    }


    /**
     * display total files found for each type of files
     */
    displayTotalOfEachType(){
        let files = this.scan.getfilesFound();       
        
        Object.keys(files).map(typeOfFile => {
            let totalFiles = this.getTotalOfFileTypesFound(files[typeOfFile]);
            let addS = totalFiles > 1? 's':'';
            this.terminal.echo(`${totalFiles} fichier${addS} de type ${typeOfFile}`)
        })
    }


    /**
     * calcul the total of files found in the type pass to parameter
     * @param {object} files 
     * @returns the total of files
     */
    getTotalOfFileTypesFound(files){
        let total = 0;

        Object.entries(files).map( ([type, list]) => {
            total += list.length;
        })

        return total;
    }


    /**
     * start the chronometer in order to know how long the application took to do its job
     */
    startTimerForAnalyse(){
        this.terminal.echoWithStartTimer(MESSAGES.timer.processusFinished);
    }
    

    
    /**
     * start to compare all files found
     */
    async startToSearchCopies(){        
        const totalFilesFound = this.scan.getTotalFilesFound();

        if( totalFilesFound < 2  ){
            this.close(CODE.closeWithNotEnoughFile);
        }else {
            await this.compareFiles();
        }
        
    }


    /**
     * search copies ( compare files ) in the files found
     */
    async compareFiles(){
        const files = this.scan.getfilesFound();

        await this.searchCopies.start(files);        
    }



    /**
     * write in a json file
     * copies found,
     * original path of the copy,
     * new path of the copy,
     * and the original file of the copy
     */
    async writeHistory(){
        await CopyController.writeHistory();
    }   


    /**
     * move the found copies to the folder generate by the application
     */
    async moveCopies(){        
        const list = await CopyController.getCopyList(); 
        const totalCopies = CopyController.getTotalCopies(); 

        if( totalCopies > 0 ){
            await this.moveFiles.moveCopiesFound(list, totalCopies);
        }      
        
    }

   
    
    /**
     * display the end message to the user
     */
    displayEnd(){        
        const totalCopiesFound = this.searchCopies.getTotalCopies();

        if( totalCopiesFound === 0 ){
            this.displayEndWhitoutCopy();
        }else{
            this.displayEndWithCopies();
        }
        
        
    }


    /**
     * application closing with no copy found
     */
    displayEndWhitoutCopy(){
        this.close(CODE.closeWithoutCopy);
    }


    /**
     * application closing with copies found
     */
    displayEndWithCopies(){
        const desktopPath = this.configurations.getDesktopPath();
        const folderReportName = this.configurations.getFolderReportName();
        const reportPath = `${desktopPath}/${folderReportName}`;
        
        this.terminal.margin();
        this.terminal.echo('Terminé.'.toUpperCase());
        this.terminal.margin();
        this.terminal.echo('Retrouver les doublons trouvés et les reports dans le dossier :');
        this.terminal.echo(reportPath);
    }


    // close the application
    close(code=0){
        this.process.close(code);
    }

   
}


module.exports = DoublonsApp;