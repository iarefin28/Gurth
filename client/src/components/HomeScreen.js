import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard.js'
import GlobalStoreContext from '../store/index.js';
import { Typography, Box, AppBar, Toolbar, CssBaseline, getNativeSelectUtilityClasses } from '@mui/material';
import Rain from './Rain.jpg'; import Snow from './Snow.jpg'; import Thunderstorm from './Thunderstorm.jpg'; import Clouds from './Clouds.jpg';  import ClearNightSky from './ClearNightSky.jpg'

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
    const [weather, setWeather] = useState({})

    useEffect(() => {
        search()
    }, []);

    const search = () => {
        fetch(`${weatherapi.base}weather?q=${query}&units=imperial&APPID=${weatherapi.key}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setWeather(result);
            })
    }

    
    let weatherContents = "";
    let weatherPic = "";
    if(weather.main != null){
        console.log(weather.weather[0].main)
        weatherContents = 
            <Box sx={{backgroundColor: "rgb(255, 255, 255, 0.2)", borderRadius: "16px", color: "white", fontSize: "50px", fontWeight: "900", textShadow: "3px 6px rgba(50, 50, 70, 0.5)"}}>
                {weather.main.temp}°F
            </Box>

        if(weather.weather[0].main === "Clouds"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Clouds + ')', backgroundSize: 'cover', backgroundPosition: 'top', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
        }
        else if(weather.weather[0].main === "Snow"){
            weatherPic = <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'url(' + Snow + ')', backgroundSize: 'cover', backgroundPosition: 'center', width: "100%", minHeight: "50%"}}>{weatherContents}</Box>
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
					elevation={0}  
        			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: "center", backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"}}
    			>
        			<Toolbar style={toolbarStyle}>
						<Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>HOME</Typography>
					</Toolbar>
        		</AppBar>

                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "column", mt: "72px", backgroundColor: "blue", width: "50%", height: `calc(100vh - 72px)`}}>
                        <Box sx={{display: "flex", flexDirection: "column", backgroundColor: "white", width: "100%", minHeight: "50%"}}>
                            {weatherPic}
                            <Box sx={{backgroundColor: "black", width: "100%", minHeight: "50%"}}>
                                
                            </Box>
                        </Box>
                        <Box sx={{backgroundColor: "pink", width: "100%", minHeight: "50%"}}>
                            
                        </Box>
                    </Box>
                    <Box sx={{mt: "72px", backgroundColor: "green", width: "50%", height: `calc(100vh - 72px)`}}>

                    </Box>
                </Box>
            </Box>
      	</Box>
    )
} 