import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

/*
    This React component represents a single quest. 
    
    @author Ishan Arefin
*/
function DiaryEntry(props) {
    const { store } = useContext(GlobalStoreContext);
    const { date, time, contents} = props;
 
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
                mt: 3
            }}>
                <Box sx={{ml: 3}}>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Date: {date} </Typography>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Time Posted: {time} </Typography>
                    <Typography align="left" color="white" sx={{mt: 3, fontFamily: "Lucida Console"}}>{contents}</Typography>
                </Box>
                <Box sx={{}}>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}></Typography>
                </Box>
            </Box>
    );
}

export default DiaryEntry;