

/**
 * Configuration messages for the class Presentation
 * @returns {object} messages to display for PRESENTATION
 */
const presentation = () => {

    const title = "doublons";
    let presentation = "";
    presentation += "Bonjour\n\n";
    presentation += "Mon travail consiste à prendre connaissance ";
    presentation += "de certains types de fichier (audio, document, photos, vidéo ) à partir du dossier ";
    presentation += "que vous m'aurez indiqué. Je vérifie aussi les sous dossiers. ";
    presentation += "Ensuite je compare entre eux les fichiers (et pas seulement les noms), ";
    presentation += "et si je trouve un doublons (fichier identique à un autre) je le déplace ";
    presentation += "dans un dossier que je créé sur votre Bureau. Vous y trouverez aussi un rapport ";
    presentation += "pour vous expliquer ce que j'ai fait.";
    presentation += "\n\n";


    return {
        title,
        presentation
    }
}


module.exports = presentation();