const getDateForFolderName = require("./getDateForFolderName");

/**
 * get the current Date and return it with the good format
 * @returns {string} the date with the format " day_month_year_hour_min "
 */
const getDate = () => {

    let date = new Date();
    const folderNameFormat = getDateForFolderName(date);

    return folderNameFormat;
}


module.exports = getDate;