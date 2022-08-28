const AllOS = require("./AllOS");

class WindowsOS extends AllOS{
    constructor(){
        super('windows');
    }
    
    getPathToDesktop(name){
        let pathToUserFolder = `C:/users/${name}`;
        return this.getUserFolderAndDesktopFolder(pathToUserFolder);        
    }
}


module.exports = WindowsOS;