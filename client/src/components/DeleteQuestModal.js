import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 200,
    backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function DeleteQuestModal(props) {     
    const {store} = useContext(GlobalStoreContext);
    
    function handleAbandonQuest(event){
        //console.log(store.selectedQuest[0])
        store.deleteQuestById(store.selectedQuest[0]);
        store.unshowDeleteQuestModal();
    }

    function handleContinueQuest(event){
        store.unshowDeleteQuestModal();
    }

    return (
        <Modal
            open={store.deleteQuestModalVisible == true}
        >
            <Box sx={style}>
                <Box>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "red", fontFamily: "Lucida Console", color: "white"}}
                    >
                        Abandon {store.selectedQuest[1]}?
                    </Typography>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "red", fontFamily: "Lucida Console", color: "white", mt: 1}}
                    >
                        PENALTY: -1 CONFIDENCE
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2, justifyContent: "center"}}>
                        <Button sx={{backgroundColor: "green", color: "white", mr: 2}} onClick={handleContinueQuest}>Continue</Button>
                        <Button sx={{backgroundColor: "red", color: "white", mr: 2}} onClick={handleAbandonQuest}>Abandon</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}