// This function is called to generate a random word.
export const WordGenerator = (roomID) => {
    // Self curated array of Fruits for debugging purposes.
    const wordArr = ["APPLE", "PEAR", "BANANA", "WATERMELON", "ORANGE", "KIWI",
                     "BLUEBERRY", "GRAPE", "PAPAYA", "LEMON", "CRANBERRY", "HONEYDEW",
                     "MANGO", "RAMBUTAN"];

    const len = wordArr.length;
    return wordArr[Math.floor(Math.random() * len)];
}