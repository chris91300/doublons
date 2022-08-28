


const close = ()=>{

    const withoutTimer = 'processus terminé'.toLocaleUpperCase();
    const notEnoughFiles = "Nombre de fichier trouvé insuffisant pour rechercher des copies.";
    const noCopy = 'Aucun doublon de trouvé. Vos dossiers sont propres.';

    return {
        withoutTimer,
        notEnoughFiles,
        noCopy
    }
}


module.exports =Object.freeze( close() );