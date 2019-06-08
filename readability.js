function getReadability(){
    /*
        Gather text from the text area.
        Break down the words and sentences.
        Get the average sentence legnth (ASL).
        Get the average syllables per word (ASW).
        Run readability forumla, get read score (RS).
    */
    let singleSyllable = 0,
        text           = document.getElementById('text').value,
        header         = document.getElementById('readability'),
        secondary      = document.getElementById('secondary'),
        sentences      = getSentences(text),
        words          = getWords(text),
        syllableCount  = getSyllables(words),
        uniqueCount    = getUnique(words)
        ASL            = words.length / sentences.length,
        ASW            = syllableCount / words.length,
        RS             = Math.round(206.835 - (1.015 * ASL) - (84.6 * ASW)),
        difficulty     = getDifficulty(RS);
    secondary.innerText = `Readability Score: ${RS} | Unique words: ${uniqueCount} | Total Words:  ${words.length}
    Average Sentence Length: ${Math.round(ASL)} words | Average Syllables: ${Math.round(ASW)} per word
    `
    return header.innerText = `Your text is ${difficulty} to read`
}

const countSyllables = word => {
    let numbers = new RegExp("[0-9]+");
    const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
    if(word.length == 1){return 1}
    if(numbers.test(word)){return 0}
    return word.match(syllableRegex) ? word.match(syllableRegex).length : 0
}

const getWords = text => {
    let result = ""
  //Remove all punctuation from text
    result = text.replace(/\W/g," ");
    result = result.trim()
  //Remove all white space from text
    result = result.replace(/\s{2,}/g," ");
  //Get all words from text
    return result.split(" ");
}
const getSentences = text => {
    let result = text.match( /[^\.!\?]+[\.!\?]+/g);
    result ? result : document.getElementById('readability').innerText = `Error: You need to have at least one sentence (that has proper punctuation)`
    return result  
}

const getSyllables = words => {
    let result = 0;
    words.map( word => {                                                       
        result += countSyllables(word)   
    })
    return result
}

const getUnique = words => {
    let wordSet = new Set(words);
    return wordSet.size
}

const getDifficulty = RS => {
    let result = ""
    switch(true) {
        case(RS <= 30)            : result = "extremely difficult"; break;
        case(RS > 30 && RS < 50)  : result = "difficult"; break;
        case(RS >= 50 && RS < 60) : result = "fairly difficult"; break;
        case(RS >= 60 && RS < 70) : result = "not difficult or easy"; break;
        case(RS >= 70 && RS < 80) : result = "fairly easy"; break;
        case(RS >= 80 && RS < 90) : result = "easy"; break;
        case(RS > 90)             : result = "very easy"; break;
    }
    return result
}