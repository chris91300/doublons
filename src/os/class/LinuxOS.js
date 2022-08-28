const AllOS = require("./AllOS");

class LinuxOS extends AllOS{
    constructor(){
        super('linux');
    }
    
    getPathToDesktop(name){
        const pathToUserFolder = `/home/${name}`;
        let pathExist = this.pathExist(pathToUserFolder);

        if( pathExist ){ 

            pathExist = this.getPathToUserDesktop(pathToUserFolder); 
            return pathExist  

        } else {
            this.displayErrorUserName();
            return false;
        }
    }
}


module.exports = LinuxOS;