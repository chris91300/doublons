const getDateForFolderName = require("./getDateForFolderName");


const getDate = () => {

    let date = new Date();
    const folderNameFormat = getDateForFolderName(date);

    return folderNameFormat;
}


module.exports = getDate;