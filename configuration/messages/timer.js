


const timer = ()=>{

    const processusFinished = 'processus terminé en '.toLocaleUpperCase();
    const analyseFileType = "\nTemps d'analyse des fichiers de type";
    const analyseFileExtension = "Temps d'analyse des fichiers";

    return {
            processusFinished,
            analyseFileType,
            analyseFileExtension
        }
}


module.exports =Object.freeze( timer() );