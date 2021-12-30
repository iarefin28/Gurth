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
    LOAD_ALL_USER_SKILLS: "LOAD_ALL_USER_SKILLS",
    SHOW_DELETE_QUEST_MODAL: "SHOW_DELETE_QUEST_MODAL",
    UNSHOW_DELETE_QUEST_MODAL: "UNSHOW_DELETE_QUEST_MODAL",
    SHOW_COMPLETE_QUEST_MODAL: "SHOW_COMPLETE_QUEST_MODAL",
    UNSHOW_COMPLETE_QUEST_MODAL: "UNSHOW_COMPLETE_QUEST_MODAL",
    SHOW_ADD_SKILL_MODAL: "SHOW_ADD_SKILL_MODAL",
    UNSHOW_ADD_SKILL_MODAL: "UNSHOW_ADD_SKILL_MODAL",
    SHOW_ADD_WORKOUT_MODAL: "SHOW_ADD_WORKOUT_MODAL",
    UNSHOW_ADD_WORKOUT_MODAL: "UNSHOW_ADD_WORKOUT_MODAL",
    LOAD_ALL_USER_WORKOUTS: "LOAD_ALL_USER_WORKOUTS"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        ADD_QUEST_ACTIVE: false,
        QUESTS: [],
        SKILLS: [],
        WORKOUTS: [],
        deleteQuestModalVisible: false,
        selectedQuest: [], //array of size 3, first element is the id, second element is the name, third is stats to inc
        addSkillModalVisible: false,
        completeQuestModalVisible: false,
        addWorkoutModalVisible: false,
    });
    const history = useHistory();

   // console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    //console.log("auth: " + auth);

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
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.CANCEL_NEW_QUEST: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.LOAD_ALL_USER_QUESTS: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: payload,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.LOAD_ALL_USER_SKILLS: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: payload,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.SHOW_DELETE_QUEST_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: store.ADD_QUEST_ACTIVE,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: true,
                    selectedQuest: payload,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.UNSHOW_DELETE_QUEST_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: store.ADD_QUEST_ACTIVE,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: payload,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.SHOW_COMPLETE_QUEST_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: store.ADD_QUEST_ACTIVE,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: payload,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: true,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.UNSHOW_COMPLETE_QUEST_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: store.ADD_QUEST_ACTIVE,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: payload,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.SHOW_ADD_SKILL_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: true,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.UNSHOW_ADD_SKILL_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.SHOW_ADD_WORKOUT_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: true
                });
            }
            case GlobalStoreActionType.UNSHOW_ADD_WORKOUT_MODAL: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
                });
            }
            case GlobalStoreActionType.LOAD_ALL_USER_WORKOUTS: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: payload,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false
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
        store.retrieveAllUserQuests(); //this code updates the quest view 
    }

    store.addSkill = async function (skillName) {
        //let skillTuple = [skillName, 0];
        //console.log(skillTuple);
        let response = await api.addSkill(skillName)
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

    store.retrieveAllUserSkills = async function(){
        let response = await api.retrieveAllUserSkills();
        if(response.status === 200){
            let skillsArray = response.data.userSkills;
            //console.log(skillsArray)
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_SKILLS,
                payload: skillsArray
            })
        }
        else{
            console.log("API FAILED TO GET THE SKILLS");
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

    store.showCompleteQuestModal = async function(questId, questName, stats){
        let selected = []
        selected.push(questId);
        selected.push(questName);
        selected.push(stats);
        storeReducer({
            type: GlobalStoreActionType.SHOW_COMPLETE_QUEST_MODAL,
            payload: selected
        });
    }

    store.unshowCompleteQuestModal = async function(){
        storeReducer({
            type: GlobalStoreActionType.UNSHOW_COMPLETE_QUEST_MODAL,
            payload: []
        });
    }

    store.deleteQuestById = async function(id){
        let response = await api.deleteQuestById(id);
        store.retrieveAllUserQuests();
        store.retrieveAllUserSkills();
    }

    store.handleAddSkill = async function(){
        //let response = await api.handleAddSkill()
    }

    store.showAddSkillModal = async function(questId, questName){
        storeReducer({
            type: GlobalStoreActionType.SHOW_ADD_SKILL_MODAL,
        });
    }

    store.unshowAddSkillModal = async function(){
        storeReducer({
            type: GlobalStoreActionType.UNSHOW_ADD_SKILL_MODAL,
        });
    }

    store.updateSkills = async function(stats){
        let response = await api.updateSkills(stats);
        if(response.status === 200){
            let skillsArray = response.data.userSkills;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_SKILLS,
                payload: skillsArray
            })
        }
        else{
            console.log("API FAILED TO GET THE SKILLS");
        }
    }

    store.showAddWorkoutModal = async function(){
        storeReducer({type: GlobalStoreActionType.SHOW_ADD_WORKOUT_MODAL})
    }

    
    store.unshowAddWorkoutModal = async function(){
        storeReducer({type: GlobalStoreActionType.UNSHOW_ADD_WORKOUT_MODAL})
    }

    store.logNewWorkout = async function (date, musclesHit, exercisesArr){
        let response = await api.addNewWorkout(date, musclesHit, exercisesArr, auth.user.email);
    }

    store.retrieveAllWorkouts = async function(){
        let response = await api.retrieveAllWorkouts();
        //console.log(response.data.userWorkouts)
        if(response.status === 200){
            let workoutsArray = response.data.userWorkouts.reverse();

            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_WORKOUTS,
                payload: workoutsArray
            })
        }
        else{
            console.log("API FAILED TO GET THE WORKOUTS");
        }
    }

    store.unloadWorkouts = async function(){
        storeReducer({
            type: GlobalStoreActionType.LOAD_ALL_USER_WORKOUTS,
            payload: []
        })
    }

    store.retrieveAllWorkoutsByDate = async function(dateString){
        console.log(dateString)
        let response = await api.retrieveAllWorkoutsByDate(dateString);
        //console.log(response.data.userWorkouts)
        if(response.status === 200){
            let workoutsArray = response.data.userWorkouts.reverse();

            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_WORKOUTS,
                payload: workoutsArray
            })
        }
        else{
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_WORKOUTS,
                payload: undefined
            })
        }
    }

    store.handleRecordDiaryEntry = async function(entry, date){
        let response = await api.addDiaryEntry(entry, date);
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