

/**
 * Configuration messages for the class Reverse
 * @returns {object} messages to display for Reverse
 */
 const presentation = () => {

    let presentation = "";
    presentation += "Bonjour\n\n";
    presentation += "Je vais remettre les doublons que j'avais trouvé la dernière fois ";
    presentation += "dans leur dossier d'origine. ";
    presentation += "\n\n";

    let end = "";
    end += "PROCESSUS TERMINÉ";

    let error = "";
    error += "Il semblerais que des erreurs soient survenues.";
    error += "Si les doublons ont été trouvé sur un disque dur externe,  ";
    error += "merci de rebrancher le disque dur avant de lancer l'opération.";


    return {
        presentation,
        end,
        error
    }
}


module.exports = presentation();