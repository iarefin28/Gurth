import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from './store-request-api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author Ishan Arefin
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    ADD_NEW_QUEST: "ADD_NEW_QUEST",
    CANCEL_NEW_QUEST: "CANCEL_NEW_QUEST",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        ADD_QUEST_ACTIVE: false
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.ADD_NEW_QUEST: {
                return setStore({
                    ADD_QUEST_ACTIVE: true,
                    payload: null
                });
            }
            case GlobalStoreActionType.CANCEL_NEW_QUEST: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    payload: null
                });
            }
            default:
                return store;
        }
    }


    store.addNewQuest = async function() {
        storeReducer({
            type: GlobalStoreActionType.ADD_NEW_QUEST
        });
    }

    store.cancelNewQuest = async function() {
        storeReducer({
            type: GlobalStoreActionType.CANCEL_NEW_QUEST
        });
    }

    store.createNewQuest = async function (questName, daysTillCompletion, statToUpdate){
        let response = await api.createNewQuest(questName, daysTillCompletion, statToUpdate);
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };