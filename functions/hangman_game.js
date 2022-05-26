export const HangmanGame = () => {
    // Variables for debugging purposes.
    const masterWord = "APPLE";
    let numLives = 6;

    // This function is called when user clicks on one of the 26 letter buttons.
    const userGuess = (currWordState, letter, lives) => {
        // Resulting word state output.
        let result = "";
    
        // If player has no lives left prompt lose UI immediately.
        if (lives <= 0) {
            console.log("You Lost!");
            return currWordState;
        }
        
        // If player makes a guess whereby the letter is not in the masterWord,
        // simply return the current state of word. ie "A__L_" or "_PPLE".
        if (!masterWord.includes(letter)) {
            console.log("Wrong guess! Lose a life.");
            numLives -= 1;
            return currWordState;
        } else {
            for (let i = 0; i < masterWord.length; ++i) {
                if (letter == masterWord.charAt(i)) {
                    if (letter == currWordState.charAt(i)) {
                        console.log("Already guessed this letter!");
                        return currWordState;
                    }
                    result += letter;
                } else {
                    result += currWordState.charAt(i);
                }
            }
    
            // Checks if the user guessed the last letter of the word.
            // *Remember to check from the client side if the fullword received has no underscores. (Signify win)
            if (result == masterWord) {
                console.log("Congratulations, You have won!");
                return result;
            }
            return result;
        }
    }
    return (<> </>);
}