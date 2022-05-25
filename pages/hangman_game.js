export const HangmanGame = () => { 
    let masterWord;
    let tempWordState;

    // Simple function to replace char at that index with the new char input.
    String.prototype.replaceCharAt = function(idx, char) {
        return this.substring(0, idx)
            + char
            + this.substring(idx + char.length);
    }

    // Initialises global variables to set masterWord as word input and 
    // sets tempWordState to all asterisks.
    const initialise = (word) => {
        masterWord = word;
        for (let i = 0; i < word.length; ++i) {
            tempWordState += "*";
        }
    }

    // Updates tempWordState according to the letter input guessed by the user.
    const userGuess = (letter) => {
        for (let i = 0; i < masterWord.length; ++i) {
            if (letter == masterWord.charAt(i)) {
                tempWordState.replaceCharAt(i, letter);
            }
        }
        return tempWordState;
    }

    return (<> </>);
}