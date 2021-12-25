import * as React from 'react';
import { useEffect, useContext, useState } from 'react';

import GlobalStoreContext from '../store/index.js';
import { List, Drawer, Paper, Button, Box, Toolbar, AppBar, CssBaseline, Typography } from '@mui/material';

//component imports
import DeleteQuestModal from './DeleteQuestModal.js';
import CompleteQuestModal from './CompleteQuestModal.js';
import AddQuestModal from './AddQuestModal.js';
import Quest from './Quest.js';
import Dashboard from './Dashboard.js'
import DateTime from './DateTime.js';

const drawerWidth = 450;

export default function QuestScreen() {
	const { store } = useContext(GlobalStoreContext);
	//const [currentStats, newStats] = useState(store.SKILLS);
	//console.log(currentStats);
	

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

	

	let quests = "";
	if(store){
		console.log(store.QUESTS)
		quests =
			<Box sx={{display: "flex", flexDirection: "column", pl: 3}}>
			{
				store.QUESTS.map((pair) => (
					<Quest
						key={pair._id}
						nameOfQuest={pair.name}
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
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
    			>
        			<Toolbar style={toolbarStyle} sx={{backgroundImage: "linear-gradient(#4F4F4F, black)"}}>
						<Button onClick={handleAddQuest} sx={{backgroundColor: "purple", color: "orange"}}>Add a new quest</Button>
					</Toolbar>
        		</AppBar>
				<Paper square={true} style={{width: "100%", height: "100%", overflow: 'auto', backgroundColor: "black"}} elevation={0} sx={{pt: "72px", display: "flex", flexDirection: "row"}}>
					<Box sx={{display: "flex", flexDirection: "column"}}>
						<Typography sx={{pl: 3}} variant="h3" style={{color: "white", fontFamily: "Lucida Console"}}>Your Quests</Typography>
						{quests}
						<DeleteQuestModal/>
						<CompleteQuestModal/>
					</Box>
					<Box>
						<Typography variant="h3" style={{color: "white", fontFamily: "Lucida Console"}}>Today's Agenda</Typography>
					</Box>
				</Paper>
        	</Box>
			
			<AddQuestModal/>
      	</Box>
  	);
}