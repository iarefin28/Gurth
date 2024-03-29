import { useContext, useState, useEffect } from 'react'
import GlobalStoreContext from '../../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Checkbox, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Button } from '@mui/material';
import { deleteQuestById } from '../../store/store-request-api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 350,
    backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function CompleteQuestModal(props) {     
    const {store} = useContext(GlobalStoreContext);
    const [completionNote, setCompletionNote] = useState("");
    
    function handleCompleteQuest(event){
        event.preventDefault();
        store.completeQuest(store.selectedQuest[2], store.selectedQuest[0], store.selectedQuest[1], new Date(), completionNote);
    }


    function handleCancelConfirmQuest(event){
        setCompletionNote("");
        store.unshowCompleteQuestModal();
    }


    let reward = ""
    if(store.selectedQuest[2] != null){
        (store.selectedQuest[2]).forEach(element => reward+=("+1 " + element + ", "));

    }

    return (
        <Modal
            open={store.completeQuestModalVisible == true}
        >
            <Box sx={style}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "green", fontFamily: "Lucida Console", color: "white"}}
                    >
                        THE SYSTEM WILL REWARD YOU FOR COMPLETING THE QUEST:
                    </Typography>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundImage: "linear-gradient(180deg, #000000 0%, #2c3e50 74%)", fontFamily: "Lucida Console", color: "white"}}
                    >
                        {store.selectedQuest[1]}
                    </Typography>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "green", fontFamily: "Lucida Console", color: "white", mb: 2}}
                    >
                        Reward: {reward.substring(0, reward.length-2)}
                    </Typography>
                    <input
                        placeholder="Write a quick note for future you to cringe"
                        onChange={(event) => setCompletionNote(event.target.value)}
                        style={{
                            outline: "none", 
                            border: "none", 
                            backgroundColor: "transparent", 
                            borderBottom: "1px solid #FFFFFF", 
                            width: "100%",
                            fontFamily: "Lucida Console",
                            color: "white",
                            marginBottom: 5
                        }}
                    />
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2, justifyContent: "center"}}>
                        <Button sx={{backgroundColor: "red", color: "black", mr: 2}} onClick={handleCancelConfirmQuest}>GO BACK</Button>
                        <Button sx={{backgroundColor: "green", color: "white"}} disabled={!completionNote} onClick={handleCompleteQuest}>ACCEPT REWARD</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}