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
import CheckIcon from '@mui/icons-material/Check';


/*
    This React component represents a single quest. 
    
    @author Ishan Arefin
*/
function ToDoEvent(props) {
    const {store} = useContext(GlobalStoreContext);
    const {nameOfEvent} = props;

    function handleDeleteTodoEvent(){
        console.log(nameOfEvent);
        store.deleteToDoEvent(nameOfEvent);
    }

    return (
        <Box sx={{width: "100%", backgroundImage: "linear-gradient(270deg, #000000 0%, #2c3e50 74%)", mt: 2, pl: 2, minHeight: "8vh",
					borderBottom: 1,
					borderTop: 1,
					borderColor: "black",
					justifyContent: "space-between",
					alignItems: "center",
					display: "flex"
					}}>
						<Typography sx={{color: "white", fontFamily: "Lucida Console"}}>{nameOfEvent}</Typography>
						<IconButton sx={{color: "white"}} onClick={handleDeleteTodoEvent}><CheckIcon></CheckIcon></IconButton>
		</Box>
    );
}

export default ToDoEvent;