import { CssBaseline, Box, AppBar, Toolbar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import React, {useState, useContext} from "react";
import GlobalStoreContext from "../store";
import { Dashboard } from ".";
import { createMuiTheme, ThemeProvider, Paper, IconButton, TextField } from "@mui/material";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DiaryEntry from "./DiaryEntry";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFFFFF'}
        }
    })

const styles = theme => ({
    multilineColor:{
        color:'red'
    }
})

const drawerWidth = 450;

export default function FitnessScreen(){
    let [addJournalBox, setJournalBox] = useState(false);
    let [showCalendar, setShowCalendar] = useState(false)
    let [entriess, setEntries] = useState(false);
    let [entry, setEntry] = useState("")
    const [value, onChange] = useState(new Date()); 
    const {store} = useContext(GlobalStoreContext)

    const toolbarStyle = {
		minHeight: '72px'
	};


    function handleClear(){
        setJournalBox(false);
        setEntries(false);
        onChange(new Date())
    }

    function handlePreviousDate(){
        let selected = value;
        selected.setDate(selected.getDate() - 1)
        store.loadDiaryEntryByDate(selected.toDateString())
    }

    function handleNextDate(){
        let selected = value;
        selected.setDate(selected.getDate() + 1)
        store.loadDiaryEntryByDate(selected.toDateString())
    }

    function handleEntryChange(event){
        setEntry(event.target.value)
    }

    function handleRecordEntry(event){
        let a = new Date()
        let date = a.toDateString();
        let time = a.getHours() + ":" + a.getMinutes();
        store.handleRecordDiaryEntry(entry, date, time);
        setJournalBox(false)
    }

    
    async function handleLoadEntries(event){
        setJournalBox(false);
        let todaysDate = new Date();
        await store.loadDiaryEntryByDate(todaysDate.toDateString());
        setShowCalendar(true);
        setEntries(true);
    }

    function loadEntryByDate(event){
        store.loadDiaryEntryByDate(value.toDateString());
    }

    let entries = "";
    if(store.entry.length == 0 && !addJournalBox){
        entries = 
            <Typography variant="h5" sx={{color: "white", fontFamily: "Lucida Console", mt: "100px"}}>No entries to show.</Typography>
    }
    else if(store.entry.length != 0 && !addJournalBox){
        entries = 
            <Box sx={{display: "flex", justifyContent: "center"}}>
                {
                    store.entry.map((pair) => (
                        <DiaryEntry
                            key={pair._id}
                            date = {pair.postDate}
                            time = {pair.postTime}
                            contents = {pair.entryContents}
                        />
                    ))
                }
            </Box>
    }

    let calendar = "";
    if(showCalendar){
        calendar = 
            <Box sx={{display: "flex", mt: "130px"}}>
                <IconButton onClick={handlePreviousDate} sx={{mr: 10, color: "white"}}><ArrowBackIcon></ArrowBackIcon></IconButton>
                <Calendar onChange={onChange} value = {value}/>
                <Button onClick={loadEntryByDate} sx={{backgroundColor: "white", color: "black", ml: 5, maxHeight: "40px", mt: 14}}>Show Entries On {value.toDateString()}</Button>
                <IconButton onClick={handleNextDate} sx={{ml: 10, color: "white"}}><ArrowForwardIcon></ArrowForwardIcon></IconButton>
            </Box>
    }

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
                            inputProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                            InputLabelProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                            multiline
                            rows="20"
                            onChange={handleEntryChange}
                        />
                    </form>
                </Box>
                <Box sx={{backgroundColor: "white", width: "80%", minHeight: "50px", display: "flex", flexDirection: "row", justifyContent: "right"}}>
                    <Button disabled={entry==""} onClick={handleRecordEntry} sx={{color: "#485461"}}>Record Entry</Button>
                </Box>
            </ThemeProvider>
    }

    let viewEntriesScreen = "";
    if(entriess){
        viewEntriesScreen =
            <Paper sx={{backgroundImage: "linear-gradient(180deg, #000000 0%, #2c3e50 74%)", overflow: 'auto', width: "100%", height: "100vh", borderRadius: 0, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Box>
                    {calendar}
                </Box>
                {entries}
            </Paper>
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
                        <Button onClick={handleClear}><Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>Diary</Typography></Button>
					</Toolbar>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Button 
                            onClick={() => {setJournalBox(true); setShowCalendar(false); setEntries(false); onChange(new Date()); store.clearEntry()}}
                            sx={{color: "white", mr: 1, mb: 1}}
                        >
                            Add an entry
                        </Button>
                        <Button 
                            sx={{color: "white", mr: 1, mb: 1}}
                            onClick={handleLoadEntries}
                        >
                            View Entries
                        </Button>
                    </Box>
        		</AppBar>
                {addAEntry}
                {viewEntriesScreen}
        	</Box>


        </Box>
    )
}