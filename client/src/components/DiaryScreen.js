import { CssBaseline, Box, AppBar, Toolbar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import React, {useState} from "react";
import { Dashboard } from ".";
import { TextField } from "@mui/material";
import { createMuiTheme, ThemeProvider } from "@mui/material";

const theme = createMuiTheme({palette: {primary: {main: '#FFFFFF'}}})

const drawerWidth = 450;

export default function FitnessScreen(){
    let [addJournalBox, setJournalBox] = useState(false);

    const toolbarStyle = {
		minHeight: '72px'
	};


    let addAEntry = "";
    if(addJournalBox){
        addAEntry = 
            <ThemeProvider theme={theme}>
                <Box sx={{mt: "120px", width: "80%", minHeight: "30px", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)", 
                borderTop: 1,
                borderRight: 1,
                borderBottom: 1,
                borderLeft: 1,
                borderColor: 'gray',
                borderRadius: 0, mt: "140px"}}>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Start journaling here..."
                            variant="outlined"
                            color="primary"
                            fullWidth
                            multiline
                            rows="20"
                        />
                    </form>
                </Box>
            </ThemeProvider>
    }


    return (
        <Box>
            <CssBaseline></CssBaseline>
            <Dashboard></Dashboard>
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, display: "flex", flexDirection: "column", alignItems: "center"}}>
        		<AppBar
        			position="fixed"  
					elevation={10}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"}}
    			>
        			<Toolbar style={toolbarStyle}>
                        <Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>Diary</Typography>
					</Toolbar>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Button 
                            onClick={() => setJournalBox(true)}
                            sx={{color: "white", mr: 1, mb: 1}}
                        >
                            Add an entry
                        </Button>
                        <Button 
                            sx={{color: "white", mr: 1, mb: 1}}
                        >
                            View Entries
                        </Button>
                    </Box>
        		</AppBar>
                {addAEntry}
        	</Box>


        </Box>
    )
}