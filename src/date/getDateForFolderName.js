
/**
 * extract to the date the day, month and year for locale
 * and replace all '/' in the date by '_';
 * @param {object} date 
 * @returns the good format to add date to the folder name ( FORMAT => day_month_year_hour_min )
 */
const getDateForFolderName = (date) => {

    let localeDate = date.toLocaleDateString();
    let dateForFolderName = localeDate.replaceAll('/', "_");
    let hour = date.getHours();
    let min = date.getMinutes();
    dateForFolderName += `_${hour}h_${min}min`;
    
    return dateForFolderName;
}


module.exports = getDateForFolderName;