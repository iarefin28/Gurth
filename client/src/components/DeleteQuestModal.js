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
    backgroundImage: "linear-gradient(#d07a82, #dcae6d)",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function DeleteQuestModal(props) {     
    const {store} = useContext(GlobalStoreContext);
    const { nameOfQuest, endDate, increase_stat} = props;
    
    function handleAbandonQuest(event){
        store.unshowDeleteQuestModal();
    }

    function handleContinueQuest(event){
        store.unshowDeleteQuestModal();
    }

    console.log(store.selectedQuest)
    return (
        <Modal
            open={store.deleteQuestModalVisible == true}
        >
            <Box sx={style}>
                <Box>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "red", fontFamily: "Lucida Console", color: "purple"}}
                    >
                        Abandon {store.selectedQuest[1]}?
                    </Typography>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "red", fontFamily: "Lucida Console", color: "purple", mt: 1}}
                    >
                        PENALTY: -1 CONFIDENCE
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2, justifyContent: "center"}}>
                        <Button sx={{backgroundColor: "red", color: "purple", mr: 2}} onClick={handleAbandonQuest}>Abandon</Button>
                        <Button sx={{backgroundColor: "green", color: "white"}} onClick={handleContinueQuest}>Continue</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}