import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import GlobalStoreContext from '../store/index.js';


//component imports
import DeleteQuestModal from './DeleteQuestModal.js';
import CompleteQuestModal from './CompleteQuestModal.js';
import AddQuestModal from './AddQuestModal.js';
import Quest from './Quest.js';
import Dashboard from './Dashboard.js'
import DateTime from './DateTime.js';

//mui imports 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { List, Drawer, Paper, Button, Box, Toolbar, AppBar, CssBaseline, Typography, IconButton, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const drawerWidth = 450;

export default function QuestScreen() {
	const { store } = useContext(GlobalStoreContext);
	const [notes, setNotes] = useState("Add notes...");

	useEffect(() => {
        store.retrieveAllUserQuests();
	 	//store.retrieveAllUserSkills();
     }, []);

	//useEffect( () => {store.retrieveAllUserSkills()}, [store.QUESTS])


	//useEffect(() => {
        //const getQuestSkillData = async () => {
			//const events = await store.retrieveAllUserQuests();
            //const skills = await store.retrieveAllUserSkills();
        //}
        //getQuestSkillData();
    //}, [])

	const toolbarStyle = {
		minHeight: '72px'
	};
	

	const handleAddQuest = (event) => {
		console.log("Add a new quest")
		event.stopPropagation();
		store.addNewQuest();
		console.log(store.ADD_QUEST_ACTIVE)
	}

	

	let quests = "";
	if(store){
		//console.log(store.QUESTS)
		quests =
			<Box sx={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
			{
				store.QUESTS.map((pair) => (
					<Quest
						key={pair._id}
						nameOfQuest={pair.name}
						descriptionOfQuest={pair.description}
						endDate={pair.endDate}
						increase_stat={pair.stats}
						questId={pair._id}
					/>
				))
			}
			</Box>
	}

	return (
    	<Box sx={{}}>
    		<CssBaseline/>
			<Dashboard></Dashboard>
        	<Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}>
        		<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"}}
    			>
        			<Toolbar style={toolbarStyle}>
						<Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>CURRENT QUESTS</Typography>
					</Toolbar>
        		</AppBar>
				<Box sx={{display: "flex", flexDirection: "row"}}>
					<Box className="fade-in" sx={{backgroundImage: "linear-gradient(180deg, #000000 0%, #2c3e50 74%)", pt: "72px", overflow: "auto", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
						<IconButton sx={{color: "white"}} onClick={handleAddQuest}><AddCircleIcon></AddCircleIcon></IconButton>
						{quests}
						<DeleteQuestModal/>
						<CompleteQuestModal/>
					</Box>
				</Box>
        	</Box>
			<AddQuestModal/>
      	</Box>
  	);
}
