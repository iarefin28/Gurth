import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

/*
    This React component represents a single quest. 
    
    @author Ishan Arefin
*/
function Quest(props) {
    const { store } = useContext(GlobalStoreContext);
    const { nameOfQuest, endDate, increase_stat, questId} = props;
 
    const todaysDate = new Date()
    const diff = endDate - todaysDate.getTime() 
    const diffInDays = Math.ceil(diff / (1000 * 3600 * 24));

    let stats = "" 
    increase_stat.forEach(element => stats += "+1 " + element + " ");

    let daysLeft = "";
    if(diffInDays > 1){
        daysLeft = " Days Remaining"
    }
    if(diffInDays == 1){
        daysLeft = " Day Remaining"
    }
    if(diffInDays == 0){
        daysLeft = " Days Remaining! FINISH TODAY!"
    }

    const handleDeleteQuest = (event) => {
        console.log(nameOfQuest);
        console.log(questId);
		store.showDeleteQuestModal(questId, nameOfQuest);
	}

    const handleCompleteQuest = (event) => {
        store.showCompleteQuestModal(questId, nameOfQuest, increase_stat);
    }

    return (
        <Box sx={{width: "95%", pb: 1}}>
            <Box sx={{
                backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
                borderTop: 3,
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 3,
                borderColor: 'silver',
                borderRadius: 0,
                marginTop: '10px',
                width: "100%",
                minHeight: 100,
            }}>
                <Typography sx={{fontFamily: "Lucida Console", color: "white", pb: 1}}>{nameOfQuest}</Typography>
                <Typography sx={{fontFamily: "Lucida Console", color: "white", pb: 1}}>{diffInDays}{daysLeft}</Typography>
                <Typography sx={{fontFamily: "Lucida Console", color: "white"}}>{stats}</Typography>
            </Box>
            
            <Box sx={{
                backgroundColor: "silver",
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 3,
                borderColor: 'silver',
                borderRadius: 0,
                width: "100%",
                minHeight: 30,
                display: "flex",
                alignItems: "right",
                justifyContent: "right"
            }}>
                <IconButton onClick={handleDeleteQuest}><IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon></IconButton>
                <IconButton onClick={handleCompleteQuest}><CheckBoxIcon></CheckBoxIcon></IconButton>
            </Box>
        </Box>
    );
}

export default Quest;