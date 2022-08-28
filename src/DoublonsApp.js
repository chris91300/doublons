
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
        
        this.startProcessIfApplicationisClose();
    }

    // à la fin du traitement, on affiche le message de fin
    startProcessIfApplicationisClose(){
        this.process.startProcessIfApplicationisClose();
    }


    //  on lance l'application
    start(){         
        this.displayPresentation();
        this.getConfigurations();
        this.scanFolders();  
    }

    // affiche la présentation de l'application
    displayPresentation(){
        this.presentation.displayPresentation();
        
    }


    getConfigurations(){
        this.configurations.init();
    }


    async scanFolders(){
        const folders = this.configurations.getFoldersList();
        const extensions = this.configurations.getExtensionsToScan();

        const scanCompleted = await this.scan.scanFolders(folders, extensions);
        if( scanCompleted){           
            
            this.displayInformationsAboutFilesFound();
            this.startToSearchCopies();
        }
        
    }


    displayInformationsAboutFilesFound(){
        this.displayTotalFilesFound();
        this.displayTotalOfEachType();
    }


    displayTotalFilesFound(){
        let totalFilesFound = this.scan.getTotalFilesFound();
        this.terminal.echo(`Nombre total de fichier trouvé : ${totalFilesFound}`);
    }


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
     * @returns the total
     */
    getTotalOfFileTypesFound(files){
        let total = 0;

        Object.entries(files).map( ([type, list]) => {
            total += list.length;
        })

        return total;
    }
    

    //  on commence à rechercher dans les fichiers trouvés les doublons
    startToSearchCopies(){
        const totalFilesFound = this.scan.getTotalFilesFound();
        if( totalFilesFound < 2  ){
            this.close(CODE.closeWithNotEnoughFile);
        }else {
            this.continueAndAnalyseFilesFound();
        }
        
    }


    async continueAndAnalyseFilesFound(){
        this.startTimerForAnalyse();
        const files = this.scan.getfilesFound();
        await this.searchCopies.start(files);

        await CopyController.writeHistory();
        await this.moveCopies();
        this.displayEnd();
        
    }


    async moveCopies(){
        const list = await CopyController.getCopyList(); 
        const totalCopies = CopyController.getTotalCopies(); 
        if( totalCopies > 0 ){
            await this.moveFiles.moveCopiesFound(list, totalCopies);
        }      
        
    }


    startTimerForAnalyse(){
        this.terminal.echoWithStartTimer(MESSAGES.timer.processusFinished);
    }

   

    //  informe l'utilisateur du dossier dans lequel on mettra les doublons
    // mettre plutot ça a la fin du processus.
    // genre scan terminé. Vous trouverez les doublons et les rapport dans le dossier
    // path ...
    displayEnd(){

        const totalCopiesFound = this.searchCopies.getTotalCopies();

        if( totalCopiesFound === 0 ){
            this.displayEndWhitoutCopy();
        }else{
            this.displayEndWithCopies();
        }
        
        
    }

    displayEndWhitoutCopy(){
        this.close(CODE.closeWithoutCopy);
    }

    displayEndWithCopies(){
        const desktopPath = this.configurations.getDesktopPath();
        const folderRapportName = this.configurations.getFolderRapportName();
        const rapportPath = `${desktopPath}/${folderRapportName}`;
        
        this.terminal.echo('\nTerminé.');
        this.terminal.echo('Retrouver les doublons trouvés et les rapport dans le dossier :');
        this.terminal.echo(rapportPath);
    }


    // ferme l'application
    close(code=0){
        this.process.close(code);
    }

   
}


module.exports = DoublonsApp;