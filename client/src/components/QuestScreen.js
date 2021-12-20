import * as React from 'react';
import Dashboard from './Dashboard.js'
import DateTime from './DateTime.js';
import { AppBar, CssBaseline, Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

import { useContext } from 'react';
import GlobalStoreContext from '../store/index.js';
import AddQuestModal from './AddQuestModal.js';

const drawerWidth = 450;

export default function QuestScreen() {
	const { store } = useContext(GlobalStoreContext);
	const toolbarStyle = {
		minHeight: '72px'
	};

	const handleAddQuest = (event) => {
		console.log("Add a new quest")
		event.stopPropagation();
		store.addNewQuest();
		console.log(store.ADD_QUEST_ACTIVE)
	}

	return (
    	<Box sx={{display: 'flex'}}>
    		<CssBaseline/>
        	<Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}>
        		<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
    			>
        			<Toolbar style={toolbarStyle} sx={{backgroundImage: "linear-gradient(90deg, #d07a82, #dcae6d)"}}>
						<Typography>Daily Quest</Typography>
						<Button onClick={handleAddQuest}>Add a new quest</Button>
					</Toolbar>
        		</AppBar>
				<Box sx={{pt: '72px', display: "flex"}}>
					{/*<Button onClick={handleAddQuest}>Add a new quest</Button>*/}
				</Box>
        	</Box>
			<Dashboard></Dashboard>
			<AddQuestModal/>
      	</Box>
  	);
}