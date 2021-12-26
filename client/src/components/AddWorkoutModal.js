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
import { List } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 600,
    backgroundImage: "linear-gradient(#d07a82, #dcae6d)",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "row"
};

export default function AddWorkoutModal() {
    const [value, onChange] = useState(new Date()); 
    const [musclesHit, musclesHitChange] = useState("");
    const [ex, setEx] = useState([]);
    const { store } = useContext(GlobalStoreContext);
    
    function handleMusclesHitNameChange(event){
        musclesHitChange(event.target.value);
    }

    function handleExNameChange(event){

    }

    function handleAddEx(event){
        if(event.key === "Enter"){
            setEx((prevEx) => [
                ...prevEx,
                event.target.value
            ])
        }
    }

    console.log(value.getMonth()+1)

    let exerciseArr = ex;
    let exercises = ""
	exercises =
        <List sx={{textAlign: "left"}}>
        {
            exerciseArr.map((pair) => (
                <Typography sx={{color: "white", fontFamily: "Lucida Console"}}>{pair}</Typography>
            ))
        }
        </List>


    return (
        <Modal
            open={store.addWorkoutModalVisible == true}
        >
            <Box sx={style}>
                <Box sx={{width: "50%"}}>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundImage: "linear-gradient(#c555a1, #452465)", fontFamily: "Lucida Console", color: "orange"}}
                    >
                        THE SYSTEM WILL NOW ADD A WORKOUT.
                    </Typography>
                    <TextField 
                        fullWidth 
                        id="standard-basic" 
                        label="Muscles Hit" 
                        variant="standard"
                        textColor="blue" 
                        onChange={handleMusclesHitNameChange}
                        sx={{mb: 2}}
                    />
                    <TextField 
                        fullWidth 
                        id="standard-basic" 
                        label="Add Exercise" 
                        variant="standard"
                        textColor="blue" 
                        onChange={handleExNameChange}
                        onKeyPress={handleAddEx}
                        sx={{mb: 2, fontFamily: "Lucida Console"}}
                    />
                    <Typography sx={{fontFamily: "Lucida Console"}}>Date of Workout:</Typography>
                    <Calendar onChange={onChange} value = {value}/>
                </Box>
                <Box sx={{
                    ml: 2, 
                    backgroundColor: "black", 
                    width: "50%", 
                    borderTop: 3, borderRight: 3, borderBottom: 3, borderLeft: 3, borderColor: 'purple', borderRadius: 4,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography align="center" variant="h5" sx={{color: "white", fontFamily: "Lucida Console"}}>Your Workout</Typography>
                    <Typography variant="h6" sx={{color: "white", fontFamily: "Lucida Console", pb: 5}}>Date of Workout: </Typography>
                    <Typography variant="h6" sx={{color: "white", fontFamily: "Lucida Console"}}>Muscles Trained:</Typography>
                    <Typography sx={{color: "white", fontFamily: "Lucida Console", pb: 5}}>{musclesHit}</Typography>
                    <Typography variant="h6" sx={{color: "white", fontFamily: "Lucida Console"}}>Exercises:</Typography>
                    <Typography sx={{color: "white", fontFamily: "Lucida Console", pb: 5}}>{exercises}</Typography>
                    
                </Box>        
            </Box>
        </Modal>
    );
}
