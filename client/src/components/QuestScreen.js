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
    }, []);

	useEffect( () => {store.retrieveAllUserSkills()}, [store.QUESTS])

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
					className="slide-in-quest-bar"
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"}}
    			>
        			<Toolbar style={toolbarStyle}>
						<Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>YOUR QUESTS</Typography>
					</Toolbar>
        		</AppBar>
				<Box sx={{display: "flex", flexDirection: "row"}}>
					<Box className="slide-in-current-quests" sx={{backgroundImage: "linear-gradient(180deg, #000000 0%, #2c3e50 74%)", pt: "72px", overflow: "auto", width: "50%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
						<Typography variant="h4" sx={{color: "white", fontFamily: "Lucida Console"}}>Current Quests</Typography>
						<IconButton sx={{color: "white"}} onClick={handleAddQuest}><AddCircleIcon></AddCircleIcon></IconButton>
						{quests}
						<DeleteQuestModal/>
						<CompleteQuestModal/>
					</Box>
					<Box className="slide-in-notes" sx={{backgroundImage: "linear-gradient(180deg, #000000 0%, #2c3e50 74%)", pt: "72px", overflow: "auto", width: "50%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
						<Typography variant="h4" sx={{color: "white", fontFamily: "Lucida Console"}}>Notes</Typography>
						<IconButton size="large" sx={{color: "white"}}><SaveAltIcon></SaveAltIcon></IconButton>
						<Box sx={{width: "95%", minHeight: "50px", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)", 
            				borderTop: 2,
            				borderRight: 2,
            				borderBottom: 2,
            				borderLeft: 2,
                			borderColor: 'gray',
                			borderRadius: 3}}>
                    			<form noValidate autoComplete="off">
                    				<TextField
                        				label={notes}
                        				variant="outlined"
                        				color="primary"
                            			fullWidth
                            			inputProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                            			InputLabelProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        				multiline
										rows="20"
                    				/>
                				</form>
            			</Box>
					</Box>
				</Box>
        	</Box>
			<AddQuestModal/>
      	</Box>
  	);
}
