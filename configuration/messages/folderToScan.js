


/**
 * Configuration messages for to get the user name
 * @returns {object} messages to display for UserName
 */
 const folderToScan= () => {

    const choices= Object.freeze([
        'Bureau/desktop',
        'Je choisi mon dossier',
        'Je choisi plusieurs dossiers'
    ]);

    const cancelOption = 'fermer le programme.';
    
    const question = 'Dans quel dossier je cherche ? ';

    const cancelWithClose = "Vous avez décidé de fermer le programme.";

    const desktop = 'desktop';
    const oneFolder = 'one directory';
    const severalFolder = 'several directory';
    const noChoice = 'Aucune option de choisi';

    const userChosen = {
        desktop,
        oneFolder,
        severalFolder,
        noChoice
    }


    return {
        choices,
        cancelOption,
        question,
        cancelWithClose,
        userChosen
    }
}


module.exports = folderToScan();
