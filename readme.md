# DOUBLONS

## Presentation

Application developed with Nodejs.  

It scans your folders for identical files.
She will ask you a few questions at the start to retrieve the information
the application needs to work well.
The copies found will be transferred to a folder created on your desktop.  

The application does not delete your copies. It lets you choose what you want to do with it.
If you want to put the copies back in their original folder, just use the option '**reverse**'.
See the Reverse part at the end of this document.



## How it works ?

1. Clone the repository.

2. `# npm install` ou `# yarn install`

2. `# node app.js` ou `# npm run start`

3. Enjoy.


## Application questions 

### Your username

The application needs your name to retrieve the path to your desktop. This is where the folder containing your duplicates will be generated.


### Folder(s) in which the application should search

The application will offer you 4 choices:
1. Bureau/desktop : If you want the application to search all folders on your desktop.

2. Je choisis mon dossier : If you prefer a scan of a specific folder.

3. Je choisis plusieurs dossiers : If you want the app to scan multiple folders.

4. Fermer le programme : If you want to quit the program.


If you choose option 2, the application will ask you for the path of the folder you want to scan.
If you choose option 3, the application will ask you for the path of a folder until you type "q" to stop.


### The types of files to search for.

The application will ask you what types of files it should search for. For each type of file, you will have to answer with "y" or "n".

File type: 

1. **Audio** :
(aiff, alac, flac, mp3, ogg, pcm, wav, wma)

2. **Document** :
(doc, docm, docx, dot, dotm, dotx, odt, pdf, potm, potx, ppam, ppsm, ppsx, pptm, pptx, rtf, sldx, thmx, txt, xlam, xlsb, xlsm, xlsx, xltx, xml, xps)

3. **Picture** :
(gif, jpeg, jpg, png, webp)

4. **Video** :
(avchd, avi, flv, f4v, mkv, mov, mpeg-2, mp4, swf, wmv)


## Results

The application will generate a report on your desktop which will contain all duplicates found.
It does not delete them. It just moves the duplicates into the generated folder. Like this, it's up to you what you do with your duplicates.


## Report

For each type of file searched, a log is generated. You will be able to see the original files and their duplicates. The original location of the duplicate but also if its name was changed before it was moved so as not to overwrite another file with the same name.  


## Reverse

If you decided to put the found copies back in their original folder, just type in your terminal: 
  
`# node app.js reverse` ou `# npm run reverse`  

