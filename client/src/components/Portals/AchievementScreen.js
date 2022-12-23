import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import GlobalStoreContext from '../../store/index.js';

//component imports
import Dashboard from '../Dashboard.js'
import Achievement from '../Achievement.js'

//mui imports 
import { List, Drawer, Paper, Button, Box, Toolbar, AppBar, CssBaseline, Typography, IconButton, TextField} from '@mui/material';


import achievement2 from '../Images/achievement2.mp4'

const drawerWidth = 450;

export default function AchievementScreen() {
	const { store } = useContext(GlobalStoreContext);

	useEffect(() => {
		store.retrieveAllUserAchievements();
	}, [])

	const toolbarStyle = {
		minHeight: '72px'
	};
	
	console.log(store.achievements)

	let achievements = "";
	if(store){
		//console.log(store.QUESTS)
		achievements =
			<Box sx={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
			{
				store.achievements.map((pair) => (
					<Achievement
						key={pair._id}
						nameOfAchievement={pair.nameOfAchievement}
						dateOfCompletion={pair.dateOfCompletion}
						completionNote={pair.completionNote}
						skillsUpdated={pair.skillsUpdated}
						achievementId={pair._id}
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
				<video class="achievements-video-bg" autoPlay loop muted>
                    <source src={achievement2} type="video/mp4"/>
            	</video>
				<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundColor: "rgb(0, 50, 50, 0.7)"}}
    			>
        			<Toolbar style={toolbarStyle}>
						<Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console", textShadow: "3px 6px rgba(50, 50, 80, 0.9)"}}>COMPLETED QUESTS</Typography>
					</Toolbar>
        		</AppBar>
				<Box className="fade-in" sx={{backgroundColor: "transparent", overflow: "auto", mt: "72px", display: "flex", flexDirection: "column", alignItems: "center"}}>
					{achievements}
				</Box>
        	</Box>
      	</Box>
  	);
}


//h