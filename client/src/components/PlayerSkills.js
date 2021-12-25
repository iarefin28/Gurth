import { React, useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import GlobalStoreContext from '../store';
import AddSkillModal from './AddSkillModal.js';
import List from '@mui/material/List';
/** 
 */


function PlayerSkills()
{
    const {store} = useContext(GlobalStoreContext);

    function handleAddSkill(){
        store.showAddSkillModal();
    }

    useEffect( () => {store.retrieveAllUserSkills()})
    

    let skills = ""
    if(store.SKILLS != null){
        console.log(store.SKILLS);
        skills = 
            <List sx={{textAlign: "right"}}>
                {
                    store.SKILLS.map((pair) => (
                        <Typography sx={{color: "purple", fontFamily: "Lucida Console"}}>{pair[0]} {pair[1]}</Typography>
                    ))
                }
            </List>
    }

    return(
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {/*<Button onClick={handleAddSkill}>Add a skill</Button>*/}
            {/*<AddSkillModal></AddSkillModal>*/}
            {skills}
        </Box>
    )
}

export default PlayerSkills;