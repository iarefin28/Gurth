import { CssBaseline, Box, AppBar, Toolbar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import React, {useState} from "react";
import { Dashboard } from ".";

const drawerWidth = 450;

export default function FitnessScreen(){
    let [addJournalBox, setJournalBox] = useState(false);

    const toolbarStyle = {
		minHeight: '72px'
	};


    let addAEntry = "";
    if(addJournalBox){
        addAEntry = 
            <Box sx={{mt: "120px", width: "60vw", minHeight: "80vh", backgroundColor: "white", 
            borderTop: 4,
            borderRight: 4,
            borderBottom: 4,
            borderLeft: 4,
            borderColor: 'gray',
            borderRadius: 0,}}>
                Hello world
            </Box>
    }


    return (
        <Box>
            <CssBaseline></CssBaseline>
            <Dashboard></Dashboard>
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, display: "flex", flexDirection: "column", alignItems: "center"}}>
        		<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(#4F4F4F, black)"}}
    			>
        			<Toolbar style={toolbarStyle}>
                        <Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>Diary</Typography>
					</Toolbar>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Button 
                            onClick={() => setJournalBox(true)}
                            sx={{backgroundColor: "white", color: "black", mr: 1, mb: 1}}
                        >
                            Add a Workout
                        </Button>
                        <Button 
                            sx={{backgroundColor: "white", color: "black", mr: 1, mb: 1}}
                        >
                            View Workouts
                        </Button>
                    </Box>
        		</AppBar>
                {addAEntry}
        	</Box>


        </Box>
    )
}