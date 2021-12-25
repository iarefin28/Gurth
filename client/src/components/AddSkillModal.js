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
    width: 600,
    height: 200,
    backgroundImage: "linear-gradient(#d07a82, #dcae6d)",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function AddSkillModal() {     
    const {store} = useContext(GlobalStoreContext);
    const [skillName, skillNameChange] = useState("");
    
    function handleSkillNameChange(event){
        skillNameChange(event.target.value);
    }

    function handleCloseModal(event){
        store.unshowAddSkillModal();
    }

    function handleAddSkill(event){
        store.addSkill(skillName);
        store.unshowAddSkillModal();
    }

    return (
        <Modal
            open={store.addSkillModalVisible == true}
        >
            <Box sx={style}>
                <Typography 
                    variant="h5" 
                    align="center" 
                    sx={{backgroundImage: "linear-gradient(#c555a1, #452465)", fontFamily: "Lucida Console", color: "orange"}}
                >
                   THE SYSTEM WILL NOW ADD A NEW SKILL.
                </Typography>
                <TextField 
                        fullWidth 
                        id="standard-basic" 
                        label="Skill Name" 
                        variant="standard"
                        textColor="blue" 
                        onChange={handleSkillNameChange}
                />
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Button style={{backgroundImage: "linear-gradient(#c555a1, #452465)", color: "orange"}} sx={{mr: 1, mt: 2}} onClick={handleCloseModal}>CANCEL</Button>
                    <Button style={{backgroundImage: "linear-gradient(#c555a1, #452465)", color: "orange"}} sx={{mt: 2}} onClick={handleAddSkill}>CONFIRM</Button>
                </Box>
            </Box>
        </Modal>
    );
}