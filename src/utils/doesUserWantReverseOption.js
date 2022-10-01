

/**
 * get global options
 * and check if there only one option and expected 'reverse'
 * @returns {Boolean} if user want the option reverse
 */
const doesUserWantReverseOption = () => {
    let userWantReverseOption = false;
    const option = process.argv.slice(2);

    if( option.length === 1 && option[0] === 'reverse' ){
        userWantReverseOption = true;
    }

    return userWantReverseOption;
}

module.exports = doesUserWantReverseOption;