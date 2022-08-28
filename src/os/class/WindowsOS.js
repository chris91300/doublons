const AllOS = require("./AllOS");

class WindowsOS extends AllOS{
    constructor(){
        super('windows');
    }
    
    getPathToDesktop(name){
        let pathToUserFolder = `C:/users/${name}`;
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


module.exports = WindowsOS;