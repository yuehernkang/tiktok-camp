import React, { useState } from 'react';
import { INITIAL_STATE } from './states';

export const EnterRoomScreen = () => {

    const [inputValue, setinputValue] = useState();

    const [joinButtonState, setJoinButtonState] = useState(true);

    const getRoomData = (roomID) => {
        getRoom(roomID).then((value) => {
            if(value == "exist") {
                //Go to lobby of specified game
                console.log("exist")
            } else {
                //Show modal or something
                console.log("noexist")
            }
        });
    }

    const onChange = (e) => {
        setinputValue(e.target.value.toUpperCase());
        if(e.target.value.length == 4) {
            setJoinButtonState(false);
        } else{
            setJoinButtonState(true);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getRoomData(event.target.value);
    }

    const backButton = () => {
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <label>Enter Room ID
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={onChange} 
                        maxLength="4"
                    />
                    <input type="submit" value="Submit" disabled={joinButtonState} />
                </label>
            </form>
            <button onClick={backButton}>back</button>
        </>
    )
}