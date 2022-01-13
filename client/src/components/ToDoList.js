import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';


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
import { borderBottom } from '@mui/system';

const drawerWidth = 450;

export default function ToDoList() {
	const history = useHistory();
	const {auth} = useContext(AuthContext);
  	const {store} = useContext(GlobalStoreContext);
	const [newEvent, setNewEvent] = useState("");

    /**Technically player skills only change on completion or deletion of a quest. 
	 * So setting the store.QUESTS to the dependency value for the useEffect does the job. Although, 
	 * not sure why putting store.SKILLS causes an infinite loop. 
	 */
	useEffect( () => {store.retrieveAllUserEvents()}, []) 


	function handleAddEvent(event){
        event.preventDefault();
        //console.log(newEvent)
        store.addToDoEvent(newEvent);
        setNewEvent("");
    }

	function handleDeleteTodoEvent(event){
		event.preventDefault();
		console.log(event);
		//store.deleteToDoEvent();
	}

	let events = "";
	if(store){
		console.log(store.todo)
		events =
			<Box sx={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
			{
				store.todo.map((pair) => (
					<Box sx={{width: "100%", backgroundImage: "linear-gradient(270deg, #000000 0%, #2c3e50 74%)", mt: 2, pl: 2, height: "8vh",
					borderBottom: 1,
					borderTop: 1,
					borderColor: "white",
					justifyContent: "space-between",
					alignItems: "center",
					display: "flex"
					}}>
						<Typography sx={{color: "white", fontFamily: "Lucida Console"}}>{pair}</Typography>
						<IconButton sx={{color: "white"}} onClick={handleDeleteTodoEvent}><CheckIcon></CheckIcon></IconButton>
					</Box>
				))
			}
			</Box>
	}


  	return (
    	<Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
			<Typography variant="h4" sx={{color: "white", fontFamily: "Lucida Console"}}>To-Do</Typography>
            <Box sx={{backgroundColor: "white", width: "100%", display: "flex", justifyContent: "center"}}>
                <form onSubmit={handleAddEvent} style={{width: "90%"}}>
                    <input
                        onChange={(event) => setNewEvent(event.target.value)}
                        placeholder="Add an event for today"
                        value={newEvent}
                        style={{width: "100%", outline: "none", border: "none", fontFamily: "Lucida Console"}}
                    />
                </form>
                <IconButton disabled={newEvent===""} sx={{color: "#485461"}} onClick={handleAddEvent}><AddCircleIcon></AddCircleIcon></IconButton>
            </Box>
			{events}
		</Box>
  	);
}