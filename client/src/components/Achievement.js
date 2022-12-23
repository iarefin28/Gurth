import { React, useContext } from "react";
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

function Achievement(props) {
    const { store } = useContext(GlobalStoreContext);
    const { nameOfAchievement, dateOfCompletion, completionNote, skillsUpdated, achievementId } = props;
 
    let ms = Date.parse(dateOfCompletion);
    let date = new Date(ms);
    let dateString = date.toDateString();

    let stats = "" 
    skillsUpdated.forEach(element => stats += "+1 " + element + " ");
    if(stats = ""){
        stats = "None"
    }
    
    return (
        <Box sx={{width: "50%", pb: 7}}>
            <Box sx={{
                backgroundColor: "rgb(0, 50, 50, 0.7)",
                borderTop: 2,
                borderRight: 2,
                borderBottom: 2,
                borderLeft: 2,
                borderColor: 'silver',
                borderRadius: 4,
                marginTop: '10px',
                width: "100%",
                minHeight: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography sx={{fontFamily: "Lucida Console", color: "white", pb: 1}}>{nameOfAchievement}</Typography>
                <Typography sx={{fontFamily: "Lucida Console", color: "white", pb: 1}}>Completed On: {dateString}</Typography>
                <Typography sx={{fontFamily: "Lucida Console", color: "white", pb: 1}}>Skills Obtained: {stats}</Typography>
                <Typography sx={{fontFamily: "Lucida Console", color: "white", pb: 1}}>Past you said: {completionNote}</Typography>
            </Box>
        </Box>
    );
}

export default Achievement;