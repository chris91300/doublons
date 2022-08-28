

/**
 * Configuration messages for to get the user name
 * @returns {object} messages to display for UserName
 */
 const userName = () => {

    const information = "Je vais avoir besoin de votre nom pour accéder à votre Bureau.";
    const question = "votre nom d'utilisateur : ";
    const error = "merci de me donner un nom valide";


    return {
        information,
        question,
        error
    }
}


module.exports = userName();