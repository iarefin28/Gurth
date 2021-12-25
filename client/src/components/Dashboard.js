import * as React from 'react';
import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DateTime from './DateTime.js'
import PlayerStatus from './PlayerStatus.js';
import PlayerSkills from './PlayerSkills.js';
import AuthContext from '../auth/index.js';
import { GlobalStoreContext } from '../store'

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BackpackIcon from '@mui/icons-material/Backpack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';

import { useHistory } from 'react-router-dom';

const drawerWidth = 450;

export default function Dashboard() {
	const history = useHistory();
	const {auth} = useContext(AuthContext);
  	const {store} = useContext(GlobalStoreContext);


    function handleLoadQuests(event) {
        history.push("/quests");
    }

    function handleLoadHome(event) {
      history.push("/");
  	}

	function handleLogout(event){
		console.log("Logout")
		auth.logoutUser();
	}


	let skills = ""
    if(store.SKILLS != null){
        //console.log(store.SKILLS);
        skills = 
            <List sx={{textAlign: "right"}}>
                {
                    store.SKILLS.map((pair) => (
                        <Typography sx={{color: "purple", fontFamily: "Lucida Console"}}>{pair[0]} {pair[1]}</Typography>
                    ))
                }
            </List>
    }

	console.log(skills);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: "linear-gradient(#d07a82, #dcae6d)", 
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box justifyContent="center" sx={{ display: "flex", flexDirection: "row"}}>
			<Box>
				<IconButton color="secondary" onClick={handleLogout}>
            		<LogoutIcon></LogoutIcon>
        		</IconButton>
			</Box>
			<Box>
				<DateTime/>
			</Box>
        </Box>
        <Divider/>
        <PlayerStatus/>
        <Divider/>
		<Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			{skills}
		</Box>
        <Divider />

        <IconButton color="secondary" onClick={handleLoadHome}>
            <HomeIcon></HomeIcon>
        </IconButton>
        <IconButton color="secondary" onClick={handleLoadQuests}>
            <AssignmentIcon></AssignmentIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <BackpackIcon></BackpackIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <FitnessCenterIcon></FitnessCenterIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <WorkIcon></WorkIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <CheckIcon></CheckIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <LockIcon></LockIcon>
        </IconButton>
      </Drawer>
    </Box>
  );
}