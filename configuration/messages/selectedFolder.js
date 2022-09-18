

/**
 * Configuration messages for to get the user name
 * @returns {object} messages to display for UserName
 */
 const selectedFolder = () => {

    const pathNoValid = "Le chemin d'accès à votre dossier n'est pas valide.";
    const forWindows = 'C:/users/name/mon_dossier';
    const forMac = '/users/name/Bureau/mon_dossier';
    const forLinux = '/home/name/Bureau/mon_dossier';

    oneFolder = {
        text: '\nVeuillez indiquer le chemin du dossier svp.',
        question: 'chemin vers votre dossier : '
    }

    severalFolder = {
        text: '\nVeuillez indiquer le chemin des dossiers svp.',
        question: 'chemin vers votre dossier'
    }

    return {
        pathNoValid,

        exemple: {
            forWindows,
            forMac,
            forLinux
        },

        choosen:{
            oneFolder,
            severalFolder
        }
    }

}


module.exports = selectedFolder();