import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

/*
    This React component represents a single quest. 
    
    @author Ishan Arefin
*/
function Quest(props) {
    const { store } = useContext(GlobalStoreContext);
    const { nameOfQuest, endDate, increase_stat} = props;
 
    const todaysDate = new Date()
    const diff = endDate - todaysDate.getTime() 
    const diffInDays = Math.ceil(diff / (1000 * 3600 * 24));

    let stats = "" 
    increase_stat.forEach(element => stats += "+1 " + element + " ");

    return (
        <Box square={true} sx={{
            backgroundImage: "linear-gradient(#d07a82, #dcae6d)",
            borderTop: 3,
            borderRight: 3,
            borderBottom: 3,
            borderLeft: 3,
            borderColor: 'purple',
            borderRadius: 0,
            marginTop: '10px',
            width: 500,
            minHeight: 100,
            mr: 3
        }}>
            <Typography sx={{fontFamily: "Lucida Console", color: "purple", pb: 1}}>Name of Quest: {nameOfQuest}</Typography>
            <Typography sx={{fontFamily: "Lucida Console", color: "purple", pb: 1}}>Time Remaining in Days: {diffInDays}</Typography>
            <Typography sx={{fontFamily: "Lucida Console", color: "purple"}}>Stats to Inc. On Completion: <br/> {stats}</Typography>
        </Box>
    );
}

export default Quest;