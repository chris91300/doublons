const AllOS = require("./AllOS");

class MacOS extends AllOS{
    constructor(){
        super('mac');
    }
    
    getPathToDesktop(name){
        const pathToUserFolder = `/Users/${name}`;
        return this.getUserFolderAndDesktopFolder(pathToUserFolder); 
    }
}


module.exports = MacOS;