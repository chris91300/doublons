
/**
 * fonction qui définie les variables d'environnement
 */
/*
const config = (actionForImgOrPdf = 'remove')=>{

    // définition en milliseconde de 6 mois, 1 an et 2 ans
    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;
    const month6 = month * 6;
    const year2 = year * 2;

        
    //  Dossier du report final
    process.env.LOG_DIR = 'C:\\users\\christophe\\Bureau\\report_doublons\\';

    //  Dossier pour les doublons possibles 
    process.env.POSSIBLE_DUPLICATE_DIR = `${process.env.LOG_DIR}doublons_possibles\\`;

    //  Dossier des dernières consultations
    process.env.LAST_CONSULTATION_DIR = `${process.env.LOG_DIR}derniere_consultation\\`;

    //  Dossier des dernières modifications
    process.env.LAST_MODIFICATION_DIR = `${process.env.LOG_DIR}derniere_modification\\`;

    //  Dossier des pdf en doublons
    process.env.PDF_DUPLICATED_DIR = `${process.env.LOG_DIR}pdf_en_double\\`;

    //  Dossier des images en doublons
    process.env.IMG_DUPLICATED_DIR = `${process.env.LOG_DIR}image_en_double\\`;

    

    // temps en milliseconde
    process.env.TIME_6_MONTH = month6
    process.env.TIME_1_YEAR = year
    process.env.TIME_2_YEAR = year2
       
    

    //dossiers à ne pas indexer
    process.env.NOT_DIR = [ process.env.LOG_DIR]

    //type de fichier à ne pas indexer
    process.env.NOT_EXT = [
        '.dll', '.z', '', '.sys',
        '.inc', '.cat', '.ini',
        '.inf', '.exe']

    // action à réaliser s'il exite des doublons pour les images et les pdf
    process.env.ACTION = actionForImgOrPdf;

}*/

const getDateForFolderName = require("../src/date/getDateForFolderName");

const config = ()=>{
    const reportName = "vos_doublons";
    const date = new Date();
    const reportCurrentScanName = getDateForFolderName(date);
    const folderReportName = `${reportName}/${reportCurrentScanName}`;
    const configuration = {
        reportName,
        folderReportName
    }

    return Object.freeze(configuration);
}
module.exports = config();