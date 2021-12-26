import { CssBaseline, Box, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import React, {useState, useContext} from "react";
import GlobalStoreContext from "../store";
import { Dashboard } from ".";
import AddWorkoutModal from "./AddWorkoutModal.js"

const drawerWidth = 450;

export default function FitnessScreen(){
    let [func, setFunc] = useState("Your Fitness")
    let [addWorkoutBox, setAddWorkoutBox] = useState(false);
    const {store} = useContext(GlobalStoreContext)

    const toolbarStyle = {
		minHeight: '72px'
	};

    function handleShowAddWorkoutModal(){
        store.showAddWorkoutModal();
    }

    return (
        <Box>
            <CssBaseline></CssBaseline>
            <Dashboard></Dashboard>
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, display: "flex", flexDirection: "column", alignItems: "center"}}>
        		<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundColor: "black"}}
    			>
        			<Toolbar style={toolbarStyle}>
                        <Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>{func}</Typography>
					</Toolbar>
                    <Box sx={{display: "flex", flexDirection: "row", backgroundColor: "black", width: "100%", justifyContent: "center"}}>
                        <Button 
                            onMouseOver={() => setFunc("Add a Workout")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            onClick={handleShowAddWorkoutModal}
                            sx={{color: "white", mb: 1}}
                        >
                            Add a Workout 
                        </Button>
                        
                        <Button 
                            onMouseOver={() => setFunc("View All Workouts")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            sx={{color: "white", mb: 1}}
                        >
                            View All Workouts
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("Find Workout By Date")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            sx={{color: "white", mb: 1}}
                        >
                            Find Workout By Date
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("Find Workout By Muscles Trained")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            sx={{color: "white", mb: 1}}
                        >
                            Find Workout By Muscles Trained
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("TBA")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            sx={{color: "white", mb: 1}}
                        >
                            Mb implement smt calorie
                        </Button>
                    </Box>
        		</AppBar>
                <AddWorkoutModal></AddWorkoutModal>
        	</Box>


        </Box>
    )
}