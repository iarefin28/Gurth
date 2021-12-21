import * as React from 'react';
import { useContext, useEffect } from 'react';
import Dashboard from './Dashboard.js'
import GlobalStoreContext from '../store/index.js';

export default function HomeScreen() {
    const {store} = useContext(GlobalStoreContext);

    useEffect(() => {
        store.retrieveAllUserQuests();
    }, []);

    return (
        <Dashboard></Dashboard>
    );
}   