const WindowsOS = require("./class/WindowsOS");
const MacOS = require("./class/MacOS");
const LinuxOS = require("./class/LinuxOS");

/**
 * get the good osComputer
 * pour information:
 * pris en charge =>
 * darwin --> Darwin platform(MacOS, IOS etc);
 * linux --> Linux Platform;
 * win32 --> windows platform;
 * 
 * pas pris en charge =>
 * aix --> IBM AIX platform;
 * freebsd --> FreeBSD Platform;
 * openbsd --> OpenBSD platform;
 * sunos --> SunOS platform;
 * @returns {object} computer (LinuxOS | MacOS | WindowsOS)
 */
const getOsComputer = ()=>{

    let osComputer;

    switch(process.platform){

        case 'win32':
            osComputer = new WindowsOS();
            break;
        
        case 'darwin':
            osComputer = new MacOS();
            break;

        case 'linux':
            osComputer = new LinuxOS();
            break;

        default:
            throw new Error("Cet OS n'est pas pris en charge.");
    }


    return osComputer;
}


module.exports = getOsComputer;