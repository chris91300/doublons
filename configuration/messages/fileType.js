const fileType = ()=>{

    const questionLikeText = "\nDois-je scanner les fichiers de type";
    const question = " ";
    const onlyAnswerYesOrNo = "Merci de répondre Y/y ou N/n uniquement.";

    return {
            questionLikeText,
            question,
            onlyAnswerYesOrNo
        }
}


module.exports =Object.freeze( fileType() );