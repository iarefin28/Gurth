import { CssBaseline, Box, AppBar, Toolbar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import React, {useState} from "react";
import { Dashboard } from ".";

const drawerWidth = 450;

export default function FitnessScreen(){
    let [func, setFunc] = useState("Your Fitness")

    const toolbarStyle = {
		minHeight: '72px'
	};

    return (
        <Box>
            <CssBaseline></CssBaseline>
            <Dashboard></Dashboard>
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, display: "flex", flexDirection: "column"}}>
        		<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(#4F4F4F, black)"}}
    			>
        			<Toolbar style={toolbarStyle}>
                        <Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>{func}</Typography>
					</Toolbar>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Button 
                            onMouseOver={() => setFunc("Add a Workout")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            sx={{backgroundColor: "white", color: "black", mr: 1}}
                        >
                            Add a Workout
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("View Workouts")} 
                            onMouseLeave={() => setFunc("Your Fitness")} 
                            sx={{backgroundColor: "white", color: "black", mr: 1}}
                        >
                            View Workouts
                        </Button>
                    </Box>
        		</AppBar>
        	</Box>


        </Box>
    )
}