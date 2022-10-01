
const DoublonsApp = require('./src/DoublonsApp');
const Reverse = require('./src/reverse/Reverse');
const doesUserWantReverseOption = require('./src/utils/doesUserWantReverseOption');


const userWantReverse = doesUserWantReverseOption();

if( userWantReverse ){
    new Reverse();
} else{
    const doublonsApp = new DoublonsApp();
    doublonsApp.start();
}




