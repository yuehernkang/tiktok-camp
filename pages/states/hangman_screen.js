import Image from "next/image";
import styled from "styled-components";
import standImage from "../../public/stand.png";

const firstRow = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"
]

const secondRow = [
    "A", "S", "D", "F", "G", "H", "J", "K", "L"
]

const thirdRow = [
    "Z", "X", "C", "V", "B", "N", "M"
]

const LetterBox = styled.button`
    background-color: #C0353CD1;
    color: white;
    margin: 2px;
`;

const KeyboardDiv = styled.div`
    display: grid;
    margin: auto;
    text-align: center;
    @media (max-width: 768px) {
        position: absolute;
        bottom: 0;
    }
`;

export const HangmanScreen = () => {

    const firstRowKeyboard = firstRow.map((item) => {
        return <LetterBox>{item}</LetterBox>
    })
    const secondRowKeyboard = secondRow.map((item) => {
        return <LetterBox>{item}</LetterBox>
    })

    const thirdRowKeyboard = thirdRow.map((item) => {
        return <LetterBox>{item}</LetterBox>
    })

    return (
        <>
        <Image src={standImage} height={200} width={20}/>
        <KeyboardDiv>
            <div>{firstRowKeyboard}</div>
            <div>{secondRowKeyboard}</div>
            <div>{thirdRowKeyboard}</div>
        </KeyboardDiv>
        </>
    )
}