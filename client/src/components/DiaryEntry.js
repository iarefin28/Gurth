import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { Typography, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
/*
    This React component represents a single diary entry.  
    @author Ishan Arefin
*/
function DiaryEntry(props) {
    const { store } = useContext(GlobalStoreContext);
    const [contentShowing, setContentShowing] = useState(false);
    const { date, time, contents} = props;
    console.log("hi")
 
    let t = "";
    let hour = time.substring(0, time.indexOf(":"));
    let minute = time.substring(time.indexOf(":") + 1, time.length)

    if(hour == 0){
        if(minute < 10){
            t = "12:0" + minute + " AM";
        }
        else{
            t = "12:" + minute + " AM";
        }
    }
    else if(hour < 12){
        if(minute < 10){
            t = hour + ":0" + minute + " AM";
        }
        else{
            t = hour + ":" + minute + " AM";
        }
    }
    else if(hour == 12){
        if(minute < 10){
            t = hour + ":0" + minute + " PM";
        }
        else{
            t = hour + ":" + minute + " PM";
        }
    }
    else{
        if(minute < 10){
            t = hour-12 + ":0" + minute + " PM";
        }
        else{
            t = hour-12 + ":" + minute + " PM";
        }
    }
    //Note to future me I had shit logic before but look how simple I made it haha. Not a fan of the nested ifs, kind've looks ugly but it works for now. Maybe I will come back to this 
    //and find a better way to implement this. I got more important things to delegate my time to atm. 
    let typeOfClick = <IconButton onClick={() => setContentShowing(true)} size="large" sx={{color: "white"}}><KeyboardArrowDownIcon></KeyboardArrowDownIcon></IconButton>
    let diaryContents = "";
    if(contentShowing){
        diaryContents = <Typography align="left" color="white" sx={{mt: 3, fontFamily: "Lucida Console", whiteSpace: "pre-line"}}>{contents}</Typography>
        typeOfClick = <IconButton onClick={() => setContentShowing(false)} size="large" sx={{color: "white"}}><KeyboardArrowUpIcon></KeyboardArrowUpIcon></IconButton>
    }



    return (
            <Box sx={{
                backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
                borderTop: 1,
                borderRight: 1,
                borderBottom: 1,
                borderLeft: 1,
                borderColor: 'silver',
                borderRadius: 0,
                width: "95%",
                minHeight: 50,
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Box sx={{ml: 3}}>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Date: {date} </Typography>
                    <Typography align="left" color="white" sx={{fontFamily: "Lucida Console"}}>Time Posted: {t} </Typography>
                    {diaryContents}
                </Box>
                <Box sx={{}}>
                    {typeOfClick}
                </Box>
            </Box>
    );
}

export default DiaryEntry;

//<Typography align="left" color="white" sx={{mt: 3, fontFamily: "Lucida Console", whiteSpace: "pre-line"}}>{contents}</Typography>