import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Typography, Box, IconButton } from "@mui/material";
import { GlobalStoreContext } from '../store'
import ToDoEvent from './ToDoEvent.js'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const drawerWidth = 450;

export default function ToDoList() {
  	const {store} = useContext(GlobalStoreContext);
	const [newEvent, setNewEvent] = useState("");

    /**Technically player skills only change on completion or deletion of a quest. 
	 * So setting the store.QUESTS to the dependency value for the useEffect does the job. Although, 
	 * not sure why putting store.SKILLS causes an infinite loop. 
	 */
	//useEffect( () => {store.retrieveAllUserEvents()}, []) 


	function handleAddEvent(event){
        event.preventDefault();
        //console.log(newEvent)
		if(newEvent!==""){
			store.addToDoEvent(newEvent.trim());
		}
        setNewEvent("");
    }

	let events = "";
	if(store){
		console.log(store.todo)
		events =
			<Box sx={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
			{
				store.todo.map((pair) => (
					<ToDoEvent
						nameOfEvent = {pair}
					/>
				))
			}
			</Box>
	}


  	return (
    	<Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
			<Typography variant="h4" sx={{color: "white", fontFamily: "Lucida Console"}}>To-Do</Typography>
            <Box sx={{backgroundColor: "white", width: "100%", display: "flex", justifyContent: "center", backgroundColor: "#121212"}}>
                <form onSubmit={handleAddEvent} style={{width: "90%"}}>
                    <input
                        onChange={(event) => setNewEvent(event.target.value)}
                        placeholder="Add an event"
						color=""
                        value={newEvent}
                        style={{backgroundColor: "#121212", width: "100%", color: "white", outline: "none", border: "none", fontFamily: "Lucida Console"}}
                    />
                </form>
                <IconButton disabled={newEvent===""} sx={{color: "#485461"}} onClick={handleAddEvent}><AddCircleIcon></AddCircleIcon></IconButton>
            </Box>
			{events}
		</Box>
  	);
}