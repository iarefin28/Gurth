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

    /**Technically player skills only change on completion or deletion of a quest. 
	 * So setting the store.QUESTS to the dependency value for the useEffect does the job. Although, 
	 * not sure why putting store.SKILLS causes an infinite loop. 
	 */
	  useEffect( () => {store.retrieveAllUserSkills()}, []) 

    function handleLoadQuests(event) {
        history.push("/quests");
    }

    function handleLoadHome(event) {
      history.push("/");
  	}

    function handleLoadFitness(event) {
        history.push("/fitness")
    }

    function handleLoadDiary(event){
      history.push("/diary");
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
                        <Typography sx={{color: "white", fontFamily: "Lucida Console"}}>{pair[0]} {pair[1]}</Typography>
                    ))
                }
            </List>
    }

	//console.log(store.SKILLS);

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
            backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
            boxShadow: "0px 0px 10px rgb(0 0 0)"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box justifyContent="center" sx={{ display: "flex", flexDirection: "row"}}>
			<Box>
				<IconButton sx={{color: "white"}}  onClick={handleLogout}>
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

        <IconButton sx={{color: "white"}} onClick={handleLoadHome}>
            <HomeIcon></HomeIcon>
        </IconButton>
        <IconButton sx={{color: "white"}}  onClick={handleLoadQuests}>
            <AssignmentIcon></AssignmentIcon>
        </IconButton>
        <IconButton sx={{color: "white"}}  onClick={handleLoadFitness}>
            <FitnessCenterIcon></FitnessCenterIcon>
        </IconButton>
        <IconButton sx={{color: "white"}}  onClick={handleLoadDiary}>
            <MenuBookIcon></MenuBookIcon>
        </IconButton>
        <IconButton sx={{color: "white"}}  disabled="true">
            <WorkIcon></WorkIcon>
        </IconButton>
        <IconButton sx={{color: "white"}}  disabled="true">
            <CheckIcon></CheckIcon>
        </IconButton>
        <IconButton sx={{color: "white"}}  disabled="true">
            <BackpackIcon></BackpackIcon>
        </IconButton>
      </Drawer>
    </Box>
  );
}