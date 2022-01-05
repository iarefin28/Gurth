import { useState, useContext } from 'react';
import AuthContext from '../auth'

import Copyright from './Copyright'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createMuiTheme, ThemeProvider } from '@mui/material';
import { Modal } from '@mui/material';
import IncorrectCredentialsModal from "./IncorrectCredentialsModal"


import Trance from './Trance.jpg'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFFFFF'}
        }
    })

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    const [failModal, setFailModal] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.loginUser(
            formData.get('email'),
            formData.get('password')
        ).catch(
            () => setFailModal(true)
        )
    };

    const handleCreateAccount = (event) => {
        event.preventDefault();
        window.location.href="http://localhost:3000/register"
    }

    let warning = ""
    if(failModal){
        warning = <Typography sx={{color: "red", fontFamily: "Lucida Console", mb: 2}}>Incorrect username or password.</Typography>
    }

    return (
    <ThemeProvider theme={theme}>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
            <Box sx={{
                minHeight: "50vh", 
                minWidth: "30vw", 
                backgroundColor: "blue",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
                borderRadius: 2,
                boxShadow: "0px 0px 30px rgb(255 255 255)"
            }}
            >
                <Typography variant="h3" sx={{color: "white", fontFamily: "Lucida Console"}}>Gurth</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{width: "90%", mt: 1, display: "flex", flexDirection: "column"}}>
                {warning}
                    <TextField
                        fullWidth
                        color="primary"
                        inputProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        InputLabelProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        required
                        name="email"
                        label="Email Address"
                        id="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        color="primary"
                        inputProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        InputLabelProps={{style: {color: "white", fontFamily: "Lucida Console"}}}
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{mt: 1}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        sx={{mt: 2, backgroundColor: "white", color: "black"}}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Box>
    </ThemeProvider>
    );
}















































// import { useContext } from 'react';
// import AuthContext from '../auth'

// import Copyright from './Copyright'

// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// import Trance from './Trance.jpg'

// export default function LoginScreen() {
//     const { auth } = useContext(AuthContext);
    

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);
//         auth.loginUser(
//             formData.get('email'),
//             formData.get('password')
//         );

//     };

//     const handleCreateAccount = (event) => {
//         event.preventDefault();
//         window.location.href="http://localhost:3000/register"
//     }

//     return (
//         <Grid container component="main" sx={{ height: '100vh' }}>
//             <CssBaseline />
//             <Grid
//                 item
//                 xs={false}
//                 sm={4}
//                 md={7}
//                 sx={{
//                     backgroundImage: 'url(' + Trance + ')',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundColor: (t) =>
//                         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//             />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundImage: "linear-gradient(#c555a1, #452465)"}}>
//                 <Box
//                     sx={{
//                         my: 12,
//                         mx: 6,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         bgcolor: "linear-gradient(purple, pink)"
//                     }}
//                 >
//                     <Typography component="h1" variant="h5">
//                         Gurth
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 0, backgroundImage: "linear-gradient(#d07a82, #dcae6d)"}}
//                         >
//                             Sign In
//                         </Button>

//                         <Button
//                             onClick={handleCreateAccount}
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 2, mb: 2, backgroundImage: "linear-gradient(#d07a82, #dcae6d)"}}
//                         >
//                             Create New Account
//                         </Button>
//                     </Box>
//                     <Copyright sx={{ mt: 5 }} />
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }