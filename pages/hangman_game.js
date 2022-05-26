export const HangmanGame = () => {
    // masterWord used for debugging purposes
    const masterWord = "APPLE";

    const userGuess = (currWordState, letter) => {
        let result = "";
    
        // If player makes a guess whereby the letter is not in the masterWord,
        // simply return the current state of word. ie "A__L_" or "_PPLE"
        if (!masterWord.includes(letter)) {
            console.log("Wrong guess! Lose a life.");
            return currWordState;
        } else {
            for (let i = 0; i < masterWord.length; ++i) {
                if (letter == masterWord.charAt(i)) {
                    if (letter == currWordState.charAt(i)) {
                        console.log("Already guessed this letter!");
                    }
                    result += letter;
                } else {
                    result += currWordState.charAt(i);
                }
            }
            return result;
        }
    }
    return (<> </>);
}