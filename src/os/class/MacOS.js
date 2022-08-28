const AllOS = require("./AllOS");

class MacOS extends AllOS{
    constructor(){
        super('mac');
    }
    
    getPathToDesktop(name){
        const pathToUserFolder = `/Users/${name}`;
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


module.exports = MacOS;