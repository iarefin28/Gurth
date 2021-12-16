import { useContext } from 'react';
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

import Trance from './Trance.jpg'

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.loginUser(
            formData.get('email'),
            formData.get('password')
        );

    };

    const handleCreateAccount = (event) => {
        event.preventDefault();
        window.location.href="http://localhost:3000/register"
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(' + Trance + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundImage: "linear-gradient(#c555a1, #452465)"}}>
                <Box
                    sx={{
                        my: 12,
                        mx: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: "linear-gradient(purple, pink)"
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Gurth
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0, backgroundImage: "linear-gradient(#d07a82, #dcae6d)"}}
                        >
                            Sign In
                        </Button>

                        <Button
                            onClick={handleCreateAccount}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, backgroundImage: "linear-gradient(#d07a82, #dcae6d)"}}
                        >
                            Create New Account
                        </Button>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Grid>
        </Grid>
    );
}