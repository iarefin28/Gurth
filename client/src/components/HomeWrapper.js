import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return <HomeScreen />
    else
        return <LoginScreen />
}