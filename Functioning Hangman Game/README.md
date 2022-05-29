This is a fully client based Hangman Game project bootstrapped with [bootstrap-v5.0.2](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

## Getting Started

Enter into the `Functioning Hangman Game/index.html` source code and run the code.
This starts up a local host on VS Code and launches the game in a browser.

## Playing the game

User can click the on-screen keyboard letter by letter at an attempt to guess a word from the category: `Fruits`.

The following are the rules to the game:
- Each successful guess will cause the underscores to be replaced by the correct letter at that position.
- Each wrong guess will cause the user to 'Lose a life' and the hangman will be closer to completion with each wrong guess.
- The game ends when the user either: 
    1. Wins by guessing the correct word before losing all 6 'lives'.
    2.  Or loses by failing to guess the correct word within 6 wrong guesses.

Upon end of game, press the `Restart Game` button to play another game!

## Possible improvements
- Due to lack of server database, the range of words to be used are limited to a self-curated array.
- Because the game is purely run on the client device, source code can be easily modified and this breaks the game interface.

As a result of the arising issues and limitations of a purely client based Hangman Game, we tried to implement a full-stack development of a multiplayer Hangman Game including a `'ready'` state and a `leaderboard`. 

However, we were met with time constraints and commitment issues to fully implement the complete game. Therefore, this folder serves as our fundamental logic and attempt at the Hangman Game Project submission.