import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';

import { Button, Paper, Typography, TextField, ListItem, IconButton } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

/*
    This React component represents a single quest. 
    
    @author Ishan Arefin
*/
function Workout(props) {
    const { store } = useContext(GlobalStoreContext);
    const { date, musclesHit, exercises} = props;
 
    let exFormat = 
        exercises.map((pair) => (
            <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>{pair}</Typography>
        ))


    /*backgroundImage: "linear-gradient(#d07a82, #dcae6d)", */
    return (
            <Box sx={{
                backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
                borderTop: 1,
                borderRight: 1,
                borderBottom: 1,
                borderLeft: 1,
                borderColor: 'silver',
                borderRadius: 0,
                width: "90%",
                minHeight: 300,
                mb: 3,
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Box sx={{ml: 3}}>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Date: {date}</Typography>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Muscles Hit: {musclesHit}</Typography>
                    <Typography align="left" color="white" sx={{mt: 3, fontFamily: "Lucida Console"}}>Notes from Workout: To be Implemented</Typography>
                </Box>
                <Box sx={{}}>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Exercises: {exFormat}</Typography>
                </Box>
            </Box>
    );
}

export default Workout;