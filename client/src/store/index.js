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
    LOAD_ALL_USER_QUESTS: "LOAD_ALL_USER_QUESTS",
    SHOW_DELETE_QUEST_MODAL: "SHOW_DELETE_QUEST_MODAL",
    UNSHOW_DELETE_QUEST_MODAL: "UNSHOW_DELETE_QUEST_MODAL"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        ADD_QUEST_ACTIVE: false,
        QUESTS: [],
        deleteQuestModalVisible: false,
        selectedQuest: [] //array of size 2, first element is the id, second element is the id 
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
                    QUESTS: store.QUESTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest
                });
            }
            case GlobalStoreActionType.CANCEL_NEW_QUEST: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest
                });
            }
            case GlobalStoreActionType.LOAD_ALL_USER_QUESTS: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: payload,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest
                });
            }
            case GlobalStoreActionType.SHOW_DELETE_QUEST_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: store.ADD_QUEST_ACTIVE,
                    QUESTS: store.QUESTS,
                    deleteQuestModalVisible: true,
                    selectedQuest: payload
                });
            }
            case GlobalStoreActionType.UNSHOW_DELETE_QUEST_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: store.ADD_QUEST_ACTIVE,
                    QUESTS: store.QUESTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: payload
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

    store.createNewQuest = async function (questName, endDate, statToUpdate){
        let response = await api.createNewQuest(questName, endDate, statToUpdate, auth.user.email);
    }


    store.retrieveAllUserQuests = async function(){
        let response = await api.retrieveAllUserQuests();
        if(response.status === 200){
            let questsArray = response.data.userQuests;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_QUESTS,
                payload: questsArray
            })
        }
        else{
            console.log("API FAILED TO GET THE QUESTS");
        }
    }

    store.showDeleteQuestModal = async function(questId, questName){
        let selected = []
        selected.push(questId);
        selected.push(questName);
        storeReducer({
            type: GlobalStoreActionType.SHOW_DELETE_QUEST_MODAL,
            payload: selected
        });
    }

    store.unshowDeleteQuestModal = async function(){
        storeReducer({
            type: GlobalStoreActionType.UNSHOW_DELETE_QUEST_MODAL,
            payload: []
        });
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