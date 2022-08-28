# DOUBLONS

## Présentation

Application développée avec Nodejs.
Elle scanne vos dossiers à la recherche de fichiers identiques.
Elle vous posera quelques questions au départ pour récupérer les informations dont
l'application a besoin pour bien travailler.


## Comment ça marche ?

1. Cloner l'application sur votre ordinateur

2. `# npm install` ou `# yarn install`

2. `# node app.js` ou `# npm run start`

3. Enjoy.


## Les questions de l'application 

### Votre nom d'utilisateur

l'application a besoin de votre nom pour récupérer le chemin vers votre bureau. C'est là que sera généré le dossier contenant vos doublons. 


### Dossier(s) dans lequel/lesquels l'application doit chercher

L'application vous proposera 4 choix :
1. Bureau/desktop : Si vous voulez que l'application recherche dans tous les dossiers que contient votre bureau.

2. Je choisis mon dossier : Si vous préférez un scan d'un dossier spécifique.

3. Je choisis plusieurs dossiers : Si vous voulez que l'application scanne plusieurs dossiers.

4. Fermer le programme : Si vous voulez quitter le programme.


Si vous choisissez l'option 2, l'application vous demandera le chemin du dossier que vous voulez scanner.
Si vous choisissez l'option 3, l'application vous demandera le chemin d'un dossier tant que vous ne tapez pas "q" pour arrêter.


### Les types de fichiers à rechercher.

L'application vous demandera quels types de fichiers elle doit rechercher. Pour chaque type de fichier, vous devrez répondre par "y" ou "n".

Type de fichiers : 

1. **Audio** :
(aiff, alac, flac, mp3, ogg, pcm, wav, wma)

2. **Document** :
(doc, docm, docx, dot, dotm, dotx, odt, pdf, potm, potx, ppam, ppsm, ppsx, pptm, pptx, rtf, sldx, thmx, txt, xlam, xlsb, xlsm, xlsx, xltx, xml, xps)

3. **Picture** :
(gif, jpeg, jpg, png, webp)

4. **Vidéo** :
(avchd, avi, flv, f4v, mkv, mov, mpeg-2, mp4, swf, wmv)


## Résultat

L'application générera un rapport sur votre bureau qui contiendra tous les doublons trouvés.
Elle ne les supprime pas. Elle déplace juste les doublons dans le dossier généré. Comme cela, c'est à vous de décider de ce que vous faites de vos doublons. 


## Rapport

Pour chaque type de fichier recherché, un log est généré. Vous pourrez voir les fichiers originaux et leurs doublons. L'emplacement original du doublon mais aussi si son nom a été modifié avant son déplacement pour ne pas écraser un autre fichier ayant le même nom.