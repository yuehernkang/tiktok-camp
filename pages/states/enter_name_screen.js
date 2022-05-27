import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CREATE_JOIN_ROOM } from "./states";
import { setName } from "../../features/nameSlice";
import { setUiState } from "../../features/uiSlice";

const PageDiv = styled.div`
    display: grid;
    text-align: center;
    color: #C0353C;
`;
const Title = styled.h1``;
const Subtitle = styled.h2``;
const InputDiv = styled.div`
    position: relative;
    width: 300px;
    left: 50%;
    transform: translateX(-50%);
`;
const NameInput = styled.input`
    width: 100%;
    padding: 10px 100px 10px 20px; 
    line-height: 1;
    box-sizing: border-box;
    outline: none;
    border: 3px solid #000;
`;
const CustomSubmitButton = styled.button `
    position: absolute;
    right: 4px;
    top: 4px;
    bottom: 3px;
    border: 3px solid #000;
    outline: none;
    margin: 0;
    padding: 0 10px;
    z-index: 2;

    :hover {
        background-color: black;
        color: white;
    }

    :disabled {
        pointer-events:none;
        cursor: not-allowed;
        background-color: rgb(229, 229, 229) !important;
    }
`;

export const EnterNameScreen = () => {
    const disPatch = useDispatch();
    const onPress = () => {
        disPatch(setName("Hello"))
        disPatch(setUiState(CREATE_JOIN_ROOM))
    }

    return (
        <PageDiv>
            <Title>Welcome to HangUs.io</Title>
            <Subtitle>Please Enter Your Name</Subtitle>
            <InputDiv>
                <NameInput/>
                <CustomSubmitButton disabled={false} onClick={onPress}>ENTER</CustomSubmitButton>
            </InputDiv>
        </PageDiv>
    );
}