import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeWrapper,
    LoginScreen,
    RegisterScreen,
    HomeScreen,
    QuestScreen,
    FitnessScreen,
    DiaryScreen,
    AchievementScreen
} from './components'


const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/quests/" exact component={QuestScreen} />
                        <Route path="/fitness/" exact component={FitnessScreen} />
                        <Route path="/homescreen/" exact component={HomeScreen} />
                        <Route path="/diary/" exact component={DiaryScreen} />
                        <Route path="/achievements/" exact component={AchievementScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App