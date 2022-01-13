import { CssBaseline, Box, AppBar, Toolbar, Button, IconButton, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import React, {useState, useContext} from "react";
import GlobalStoreContext from "../store";
import { Dashboard } from ".";
import AddWorkoutModal from "./AddWorkoutModal.js"
import Workout from "./Workout.js"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Fitness from "./Images/Fitness.jpg"

const drawerWidth = 450;

export default function FitnessScreen(){
    let [func, setFunc] = useState("Church of Iron")
    let [showingWorkouts, setShowingWorkouts] = useState(false)
    let [showingCalendar, setShowingCalendar] = useState(false)
    let [workoutPadding, setPadding] = useState("130px")
    let [title, newTitle] = useState("")
    let [findAnotherByDate, setFindAnotherByDate] = useState(false);
    const [value, onChange] = useState(new Date()); 
    const {store} = useContext(GlobalStoreContext)

    const toolbarStyle = {
		minHeight: '72px'
	};

    function handleShowAddWorkoutModal(){
        handleClear()
        store.showAddWorkoutModal();
         //--- maybe need this line for dynamic loading..... 
    }

    async function handleLoadAllWorkouts(){
        await store.retrieveAllWorkouts();
        setPadding("130px")
        newTitle("All Workouts")
        setShowingWorkouts(true)
        setShowingCalendar(false)
    }

    function handleClear(){
        setShowingCalendar(false)
        setShowingWorkouts(false)
    }

    function handleFindWorkoutByDateButton(){
        setShowingWorkouts(false);
        store.unloadWorkouts();
        //console.log(value.toDateString())
        newTitle("Workouts Found")
        setShowingCalendar(true);
    }

    async function handleFindWorkoutByDate(){
        await store.retrieveAllWorkoutsByDate(value.toDateString())
        setPadding("130px")
        setShowingCalendar(false);
        setShowingWorkouts(true);
        setFindAnotherByDate(true);
    }

    let findWorkoutByDate = "";
    if(findAnotherByDate){
        findWorkoutByDate =
            <Box>
                <Button onClick={handleFindWorkoutByDateButton} sx={{backgroundColor: "white", color: "black", ml: 5, maxHeight: "40px", mt: 14}}>Find Workouts On {value.toDateString()}</Button>
            </Box>
    }


    let workouts = ""
    if(showingWorkouts && store.WORKOUTS.length!=0){
        workouts =
        <Paper square={true} style={{width: "100%", height: "100vh", overflow: 'auto', backgroundImage: "linear-gradient(147deg, #000000 0%, #2c3e50 74%)"}} elevation={0} sx={{pt: workoutPadding, display: "flex", flexDirection: "column", alignItems: "center"}}>
			<Typography variant="h5" sx={{color: "white", fontFamily: "Lucida Console", pb: 3}}>{title}</Typography>
            {
				store.WORKOUTS.map((pair) => (
					<Workout
						key={pair._id}
                        date = {pair.date}
                        musclesHit = {pair.musclesHit}
                        exercises = {pair.exercises}
					/>
				))
			}
		</Paper>
    }
    else if(showingWorkouts && store.WORKOUTS.length==0){
        workouts =
            <Typography variant="h5" sx={{color: "white", fontFamily: "Lucida Console", mt: "150px"}}>No workouts were found.</Typography>
    }

    //calendar is in a box to prevent weird styling behavior
    let calendar = ""
    if(showingCalendar){
        calendar = 
        <Paper square={true} style={{width: "100%", height: "100vh", overflow: 'auto', backgroundImage: "linear-gradient(147deg, #000000 0%, #2c3e50 74%)"}} elevation={0} sx={{pt: "250px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <Box>
                <Calendar onChange={onChange} value = {value}/>
            </Box>
            <Button onClick={handleFindWorkoutByDate} sx={{backgroundColor: "white", color: "black", ml: 5, maxHeight: "40px", mt: 14}}>Find Workouts On {value.toDateString()}</Button>
        </Paper>
    }

    return (
        <Box>
            <CssBaseline></CssBaseline>
            <Dashboard></Dashboard>
            <Box sx={{ backgroundImage: 'url(' + Fitness + ')', backgroundSize: 'cover', backgroundPosition: 'center', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, display: "flex", flexDirection: "column", alignItems: "center", height: "100vh"}}>
        		<AppBar
        			position="fixed"  
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"}}
    			>
        			<Toolbar style={toolbarStyle}>
                        <Button onClick={handleClear}><Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>{func}</Typography></Button>
					</Toolbar>
                    <Box sx={{display: "flex", flexDirection: "row", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)", width: "100%", justifyContent: "center"}}>
                        <Button 
                            onMouseOver={() => setFunc("Add a Workout")} 
                            onMouseLeave={() => setFunc("Church of Iron")} 
                            onClick={handleShowAddWorkoutModal}
                            sx={{color: "white", mb: 1}}
                        >
                            Add a Workout 
                        </Button>
                        
                        <Button 
                            onMouseOver={() => setFunc("View All Workouts")} 
                            onMouseLeave={() => setFunc("Church of Iron")} 
                            onClick={handleLoadAllWorkouts}
                            sx={{color: "white", mb: 1}}
                        >
                            View All Workouts
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("Find Workout By Date")} 
                            onMouseLeave={() => setFunc("Church of Iron")} 
                            onClick={handleFindWorkoutByDateButton}
                            sx={{color: "white", mb: 1}}
                        >
                            Find Workout By Date
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("Find Workout By Muscles Trained")} 
                            onMouseLeave={() => setFunc("Church of Iron")} 
                            sx={{color: "white", mb: 1}}
                            disabled={true}
                        >
                            Find Workout By Muscles Trained
                        </Button>
                        <Button 
                            onMouseOver={() => setFunc("TBA")} 
                            onMouseLeave={() => setFunc("Church of Iron")} 
                            sx={{color: "white", mb: 1}}
                            disabled={true}
                        >
                            Mb implement smt calorie
                        </Button>
                    </Box>
        		</AppBar>
                <AddWorkoutModal></AddWorkoutModal>
                {calendar}
                {workouts}
        	</Box>


        </Box>
    )
}