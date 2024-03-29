import { useContext, useState } from 'react'
import GlobalStoreContext from '../../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Checkbox, TextField, IconButton, extractEventHandlers } from '@mui/material';
import { Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Button } from '@mui/material';
import { List } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 600,
    backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
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
    const [exVal, setExVal] = useState("");
    const { store } = useContext(GlobalStoreContext);
    
    function handleMusclesHitNameChange(event){
        musclesHitChange(event.target.value);
    }

    function handleAddEx(event){
        event.preventDefault();
        setEx((prevEx) => [
            ...prevEx,
            exVal
        ])
        setExVal("")
    }

    function handleCloseModal(event){
        onChange(new Date());
        musclesHitChange("");
        setEx([]);
        store.unshowAddWorkoutModal();
    }

    function handleDeleteExercise(event){
        let newArray = ex;
        newArray.pop();
        setEx((prevEx) => [newArray])
    }

    function handleLogWorkout(event){
        //console.log(value)
        //console.log(musclesHit)
        //console.log(ex)
        event.preventDefault();
        store.logNewWorkout(value.toDateString(), musclesHit, ex);
        onChange(new Date());
        musclesHitChange("");
        setEx([]);
    }


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
                        sx={{backgroundColor: "silver", fontFamily: "Lucida Console", color: "black"}}
                    >
                        THE SYSTEM WILL NOW ADD A WORKOUT.
                    </Typography>
                    <input
                        placeholder="Muscles Hit"
                        onChange={handleMusclesHitNameChange}
                        style={{
                            outline: "none", 
                            border: "none", 
                            backgroundColor: "transparent", 
                            borderBottom: "1px solid #FFFFFF", 
                            width: "100%",
                            fontFamily: "Lucida Console",
                            color: "white",
                            marginBottom: 5
                        }}
                    />
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <form onSubmit={handleAddEx} style={{width: "100%"}}>
                            <input
                                placeholder="Add Exercise"
                                onChange={(event) => setExVal(event.target.value)}
                                value={exVal}
                                style={{
                                    outline: "none", 
                                    border: "none", 
                                    backgroundColor: "transparent", 
                                    borderBottom: "1px solid #FFFFFF", 
                                    width: "100%",
                                    fontFamily: "Lucida Console",
                                    color: "white"
                                }}
                            />
                        </form>
                        <IconButton onClick={handleDeleteExercise}><UndoIcon></UndoIcon></IconButton>
                    </Box>
                    <Typography sx={{fontFamily: "Lucida Console", color: "white"}}>Date of Workout:</Typography>
                    <Calendar onChange={onChange} value = {value}/>
                </Box>
                <Box sx={{
                    ml: 2, 
                    backgroundColor: "black", 
                    width: "50%", 
                    borderTop: 3, borderRight: 3, borderBottom: 3, borderLeft: 3, borderColor: 'silver', borderRadius: 4,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography align="center" variant="h5" sx={{color: "white", fontFamily: "Lucida Console"}}>Your Workout</Typography>
                    <Typography variant="h6" sx={{color: "white", fontFamily: "Lucida Console", pb: 1}}>Date of Workout: {value.toDateString()} </Typography>
                    <Typography variant="h6" sx={{color: "white", fontFamily: "Lucida Console"}}>Muscles Trained:</Typography>
                    <Typography sx={{color: "white", fontFamily: "Lucida Console", pb: 3}}>{musclesHit}</Typography>
                    <Typography variant="h6" sx={{color: "white", fontFamily: "Lucida Console"}}>Exercises:</Typography>
                    <Typography sx={{color: "white", fontFamily: "Lucida Console", pb: 5}}>{exercises}</Typography>
                    
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <Button onClick={handleCloseModal} sx={{backgroundColor: "white", color: "black", mr: 1}}>Discard Workout</Button>
                        <Button onClick={handleLogWorkout} sx={{backgroundColor: "white", color: "black"}}>Log Workout</Button>
                    </Box>
                </Box>        
            </Box>
        </Modal>
    );
}
