const AllOS = require("./AllOS");

class LinuxOS extends AllOS{
    constructor(){
        super('linux');
    }
    
    getPathToDesktop(name){
        const pathToUserFolder = `/home/${name}`;
        return this.getUserFolderAndDesktopFolder(pathToUserFolder); 
    }
}


module.exports = LinuxOS;