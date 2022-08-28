
const MESSAGES_PRESENTATION = require('./presentation')
const MESSAGES_USER_NAME = require('./userName')
const MESSAGES_OS = require('./os')
const MESSAGES_FOLDER_TO_SCAN = require('./folderToScan')
const MESSAGES_SELECTED_FOLDER = require('./selectedFolder')
const MESSAGES_FILE_TYPE = require('./fileType')
const MESSAGES_SCAN = require('./scan')
const MESSAGES_MOVE_FILES = require('./moveFiles');
const MESSAGES_TIMER = require('./timer');
const MESSAGES_SEARCH = require('./search');
const MESSAGES_CLOSE = require('./close');

const MESSAGES = ()=>{

    return {
        presentation: { ...MESSAGES_PRESENTATION },
        userName : { ...MESSAGES_USER_NAME },
        os: {  ...MESSAGES_OS },
        folderToScan: { ...MESSAGES_FOLDER_TO_SCAN },
        selectedFolder: { ...MESSAGES_SELECTED_FOLDER },
        fileType: { ...MESSAGES_FILE_TYPE },
        scan: { ...MESSAGES_SCAN },
        moveFiles: {  ...MESSAGES_MOVE_FILES },
        search: { ...MESSAGES_SEARCH },
        timer:{ ...MESSAGES_TIMER },
        close:{ ...MESSAGES_CLOSE },
    }

}


module.exports = Object.freeze( MESSAGES() );