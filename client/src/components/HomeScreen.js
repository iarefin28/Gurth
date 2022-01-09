import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard.js'
import GlobalStoreContext from '../store/index.js';
import { Paper, Typography, Box, AppBar, Toolbar, CssBaseline, getNativeSelectUtilityClasses, TextField, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Rain from './Rain.jpg'; import Snow from './Snow.jpg'; import Thunderstorm from './Thunderstorm.jpg'; import Clouds from './Clouds.jpg';  import ClearNightSky from './ClearNightSky.jpg'
import Ocean from './Ocean.jpg'; import Waves from './Waves.jpg'; import MoreWaves from './MoreWaves.jpg'; import EpicWaves from './EpicWaves.jpg'
import Snow2 from './Snow2.jpg';



const drawerWidth = 450;

const toolbarStyle = {
    minHeight: '72px'
};

const weatherapi = {
    key: "92c0d0089e64aab639c87fda7cb9a020",
    base: "https://api.openweathermap.org/data/2.5/"
}

export default function HomeScreen() {
    const {store} = useContext(GlobalStoreContext);
    const [query, setQuery] = useState("New York");
    const [weather, setWeather] = useState({});
    const [quote, setQuote] = useState({});
    const [newEvent, setNewEvent] = useState("");

    useEffect(() => {
        search()
        quotes()
    }, []);

    const search = () => {
        fetch(`${weatherapi.base}weather?q=${query}&units=imperial&APPID=${weatherapi.key}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setWeather(result);
            })
    }

    const quotes = () => {
        fetch("https://type.fit/api/quotes")
            .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data[getRandomInt(data.length)]);
            setQuote(data[getRandomInt(data.length)])
        });
    }

    function getRandomInt(max){
        return Math.floor(Math.random() * max)
    }

    function handleAddEvent(event){
        event.preventDefault();
        //console.log(newEvent)
        store.addToDoEvent(newEvent);
        setNewEvent("");
    }

    
    let weatherContents = "";
    let weatherPic = "";
    if(weather.main != null){
        console.log(weather.weather[0].main)
        weatherContents = 
            <Box sx={{backgroundColor: "rgb(0, 0, 0, 0.2)", borderRadius: "16px", color: "white", fontSize: "50px", fontWeight: "900", textShadow: "3px 6px rgba(50, 50, 70, 0.5)"}}>
                {weather.main.temp}°F
            </Box>

        if(weather.weather[0].main === "Clouds"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Clouds + ')', backgroundSize: 'cover', backgroundPosition: 'top', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
        }
        else if(weather.weather[0].main === "Snow"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Snow2 + ')', backgroundSize: 'cover', backgroundPosition: 'bottom', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
        }
        else if(weather.weather[0].main === "Rain"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Rain + ')', backgroundSize: 'cover', backgroundPosition: 'bottom', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
        }
        else if(weather.weather[0].main === "Drizzle"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Rain + ')', backgroundSize: 'cover', backgroundPosition: 'bottom', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
        }
        else if(weather.weather[0].main === "Thunderstorm"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Thunderstorm + ')', backgroundSize: 'cover', backgroundPosition: 'center', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
        }
        else if(weather.weather[0].main === "Clear"){
            weatherPic = 
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + ClearNightSky + ')', backgroundSize: 'cover', backgroundPosition: 'center', width: "100%", minHeight: "50%"}}>
                    {weatherContents}
                </Box>
        }
        else{

        }
    }


    return (
        <Box sx={{}}>
    		<CssBaseline/>
			<Dashboard></Dashboard>
        	<Box sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}>
        		<AppBar
        			position="fixed"  
					elevation={5}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"}}
    			>
        			<Toolbar style={toolbarStyle}>
						<Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>HOME</Typography>
					</Toolbar>
        		</AppBar>

                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: "72px", backgroundImage: "transparent", width: "50%", height: `calc(100vh - 72px)`}}>
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
                        
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", mt: "72px", backgroundColor: "transparent", width: "50%", height: `calc(100vh - 72px)`}}>
                        <Box sx={{display: "flex", flexDirection: "column", backgroundColor: "white", width: "100%", minHeight: "50%", borderTop: 0, borderRight: 0, borderLeft: 1, borderBottom: 1, borderColor: "white"}}>
                            {weatherPic}
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + MoreWaves + ')', backgroundSize: 'cover', backgroundPosition: 'top', width: "100%", minHeight: "50%"}}>
                                <Typography align="center" sx={{backgroundColor: "rgb(0, 0, 0, 0.2)", borderRadius: "16px", color: "white", fontSize: "20px", fontWeight: "900", color: "white", fontFamily: "Lucida Console"}}>{quote.text} - {quote.author}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{backgroundImage: "transparent", width: "100%", minHeight: "50%", borderTop: 0, borderRight: 0, borderLeft: 1, borderBottom: 0, borderColor: "white"}}>
                        <Box sx={{width: "100%", height: "100%", backgroundColor: "white", borderLeft: 1, borderColor: 'gray', display: "flex", flexDirection: "column"}}>
                                
                        </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
      	</Box>
    )
} 