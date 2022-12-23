import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import GlobalStoreContext from '../../store/index.js';


//component imports
import DeleteQuestModal from '../Modals/DeleteQuestModal.js';
import CompleteQuestModal from '../Modals/CompleteQuestModal.js';
import AddQuestModal from '../Modals/AddQuestModal.js';
import Quest from '../Quest.js';
import Dashboard from '../Dashboard.js'
import DateTime from '../DateTime.js';
import achievement2 from '../Images/achievement2.mp4'

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
     }, []);

	const toolbarStyle = {
		minHeight: '72px'
	};
	

	const handleAddQuest = (event) => {
		console.log("Add a new quest")
		event.stopPropagation();
		store.addNewQuest();
		console.log(store.ADD_QUEST_ACTIVE)
	}

	let backgroundVideo = 
		<video 
			class="achievements-video-bg" 
			autoPlay
			loop
			muted
		>
            <source src={achievement2} type="video/mp4"/>
        </video>

	

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
        	<Box sx={{background: "rgba(0, 0, 0, 0)", width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column"}}>
				{backgroundVideo}
				<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundColor: "rgb(0, 50, 50, 0.7)"}}
    			>
        			<Toolbar style={toolbarStyle}>
						<Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console", textShadow: "3px 6px rgba(50, 50, 80, 0.9)"}}>Current Quests</Typography>
					</Toolbar>
        		</AppBar>
				<Box className="fade-in" sx={{backgroundColor: "transparent", overflow: "auto", mt: "72px", display: "flex", flexDirection: "column", alignItems: "center"}}>
				<IconButton sx={{color: "white"}} onClick={handleAddQuest}><AddCircleIcon></AddCircleIcon></IconButton>
					{quests}
					<AddQuestModal/>
					<DeleteQuestModal/>
					<CompleteQuestModal/>
				</Box>
        	</Box>
      	</Box>
  	);
}