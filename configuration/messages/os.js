

/**
 * Configuration messages for to get the user name
 * @returns {object} messages to display for UserName
 */
 const os = () => {

    const userName  = "Désolé mais je ne parviens pas à trouver votre dossier utilisateur.\n";
    const desktopPath = 'Aucun dossier Bureau ou Desktop trouvé.';


    return {
        error: {
            userName,
            desktopPath
        }
    }
}


module.exports = os();