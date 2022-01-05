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
    width: 700,
    height: 550,
    backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddQuestModal() {
    const [value, onChange] = useState(new Date()); //quest end date 
    const [questName, questNameChange] = useState("");
    const [fit, selectFit] = useState(false);
    const [intro, selectIntro] = useState(false);
    const [con, selectCon] = useState(false);
    const [sel, selectSel] = useState(false);
    const [pro, selectPro] = useState(false);

    const { store } = useContext(GlobalStoreContext);
    const name = ""

    //console.log(fit + " " + intro + " " + cok + " " + con + " " + sel + " " + pro);
    
    function handleQuestNameChange(event){
        questNameChange(event.target.value);
    }

    function handleAddNewQuest(event) {
        const statsToUpdate = [];
        if(fit) statsToUpdate.push("Fitness");
        if(intro) statsToUpdate.push("Introspection");
        if(con) statsToUpdate.push("Confidence")
        if(sel) statsToUpdate.push("Self-Discipline")
        if(pro) statsToUpdate.push("Programming");

        const valueTime = value.getTime();
        
        store.createNewQuest(questName, valueTime, statsToUpdate);
        handleCloseModal();
        //store.retrieveAllUserQuests();
    }

    function handleCloseModal(event) {
        selectFit(false);
        selectIntro(false);
        selectCon(false);
        selectSel(false);
        selectPro(false);
        store.cancelNewQuest();
    }

    return (
        <Modal
            open={store.ADD_QUEST_ACTIVE == true}
        >
            <Box sx={style}>
                <Box>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{backgroundColor: "silver", fontFamily: "Lucida Console", color: "black"}}
                    >
                        THE SYSTEM WILL NOW ADD A QUEST.
                    </Typography>
                    <TextField 
                        fullWidth 
                        id="standard-basic" 
                        label="Quest Name" 
                        variant="standard"
                        inputProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        InputLabelProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        onChange={handleQuestNameChange}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row"}}>
                        <Box>
                            <Typography variant="h5" sx={{pt: 3, fontFamily: "Lucida Console", color: "white"}}>Quest End Date:</Typography>
                            <Calendar onChange={onChange} value = {value}/>
                        </Box>
                        <Box sx={{pl: 2, pt: 3}}>
                            <Typography variant="h5" sx={{fontFamily: "Lucida Console", color: "white"}}> Stats to Increase:</Typography>
                            <FormControlLabel control={<Checkbox sx={{color: "white"}} onChange={() => selectFit(!fit)}/>} label="Fitness"/>
                            <FormControlLabel control={<Checkbox sx={{color: "white"}} onChange={() => selectIntro(!intro)} />} label="Introspection" />
                            <FormControlLabel control={<Checkbox sx={{color: "white"}} onChange={() => selectCon(!con)}/>} label="Confidence"/>
                            <FormControlLabel control={<Checkbox sx={{color: "white"}} onChange={() => selectSel(!sel)}/>} label="Self-Discipline"/>
                            <FormControlLabel control={<Checkbox sx={{color: "white"}} onChange={() => selectPro(!pro)}/>} label="Programming"/>
                            
                           
                            <Button fullWidth style={{backgroundColor: "silver", color: "black"}} sx={{mb: 1, mt: 15}} onClick={handleCloseModal}>CANCEL</Button>
                            <Button fullWidth style={{backgroundColor: "silver", color: "black"}} onClick={handleAddNewQuest}>CONFIRM</Button>
                        </Box>
                    </Box>
                    
                </Box>
            </Box>
        </Modal>
    );
}

//<TextField id="standard-basic" label="Quest Name" variant="standard" />