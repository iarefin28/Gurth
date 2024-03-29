import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api, { retrieveAllUserEvents } from './store-request-api'
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
    LOAD_ALL_USER_WORKOUTS: "LOAD_ALL_USER_WORKOUTS",
    LOAD_ENTRY_BY_DATE: "LOAD_ENTRY_BY_DATE",
    CLEAR_ENTRY: "CLEAR_ENTRY",
    LOAD_ALL_USER_EVENTS: "LOAD_ALL_USER_EVENTS",
    LOAD_HOMESCREEN_DATA: "LOAD_HOMESCREEN_DATA",
    COMPLETE_QUEST: "COMPLETE_QUEST",
    LOAD_ALL_USER_ACHIEVEMENTS: "LOAD_ALL_USER_ACHIEVEMENTS"
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
        entry: [],
        todo: [],
        achievements: []
    });
    const history = useHistory();

   // console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    //console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload, payload2 } = action;
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: true,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
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
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
                });
            }
            case GlobalStoreActionType.LOAD_ENTRY_BY_DATE: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false,
                    entry: payload,
                    todo: store.todo,
                    achievements: store.achievements
                });
            }
            case GlobalStoreActionType.CLEAR_ENTRY: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false,
                    entry: payload,
                    todo: store.todo,
                    achievements: store.achievements
                });
            }
            case GlobalStoreActionType.LOAD_ALL_USER_EVENTS: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: payload,
                    achievements: store.achievements
                });
            }
            case GlobalStoreActionType.LOAD_HOMESCREEN_DATA: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: payload2,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: payload,
                    achievements: store.achievements
                })
            }
            case GlobalStoreActionType.COMPLETE_QUEST: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: payload2,
                    SKILLS: payload,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: store.achievements
                })
            }
            case GlobalStoreActionType.LOAD_ALL_USER_ACHIEVEMENTS: {
                return setStore({
                    ADD_QUEST_ACTIVE: false,
                    QUESTS: store.QUESTS,
                    SKILLS: store.SKILLS,
                    WORKOUTS: store.WORKOUTS,
                    deleteQuestModalVisible: false,
                    selectedQuest: store.selectedQuest,
                    addSkillModalVisible: false,
                    completeQuestModalVisible: false,
                    addWorkoutModalVisible: false,
                    entry: store.entry,
                    todo: store.todo,
                    achievements: payload
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

    store.createNewQuest = async function (questName, questDescription, endDate, statToUpdate){
        let response = await api.createNewQuest(questName, questDescription, endDate, statToUpdate, auth.user.email);
        store.retrieveAllUserQuests(); 
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



    store.showAddWorkoutModal = async function(){
        storeReducer({type: GlobalStoreActionType.SHOW_ADD_WORKOUT_MODAL})
    }

    
    store.unshowAddWorkoutModal = async function(){
        storeReducer({type: GlobalStoreActionType.UNSHOW_ADD_WORKOUT_MODAL})
    }

    store.logNewWorkout = async function (date, musclesHit, exercisesArr){
        let response = await api.addNewWorkout(date, musclesHit, exercisesArr, auth.user.email);
        storeReducer({type: GlobalStoreActionType.UNSHOW_ADD_WORKOUT_MODAL})
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

    store.handleRecordDiaryEntry = async function(entry, date, time){
        let response = await api.addDiaryEntry(entry, date, time);
    }

    store.loadDiaryEntryByDate = async function(date){
        let response = await api.getEntryByDate(date);
        if(response.status === 200){
            let entry = response.data.userEntry;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ENTRY_BY_DATE,
                payload: entry
            })
        }
    }

    store.clearEntry = async function(){
        storeReducer({
            type: GlobalStoreActionType.CLEAR_ENTRY,
            payload: []
        })
    }

    store.addToDoEvent = async function(nameOfEvent){
        let response = await api.addToDoEvent(nameOfEvent)
        store.retrieveAllUserEvents();
    }

    store.deleteToDoEvent = async function(nameOfEvent){
        let response = await api.deleteToDoEvent(nameOfEvent)
        store.retrieveAllUserEvents();
    }

    store.retrieveAllUserEvents = async function(){
        let response = await api.retrieveAllUserEvents();
        if(response.status === 200){
            let todo = response.data.todo;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_EVENTS,
                payload: todo
            })
        }
        else{
            console.log("API FAILED TO GET THE SKILLS");
        }
    }

    store.retrieveHomescreenData = async function(){
        let response1 = await api.retrieveAllUserEvents();
        let response2 = await api.retrieveAllUserSkills();
        if(response1.status === 200 && response2.status === 200){
            let todo = response1.data.todo;
            let userSkills = response2.data.userSkills;
            storeReducer({
                type: GlobalStoreActionType.LOAD_HOMESCREEN_DATA,
                payload: todo,
                payload2: userSkills
            })
        }
        else{
            console.log("API FAILED TO GET THE SKILLS");
        }
    }
    store.updateSkills = async function(stats){
        let response = await api.updateSkills(stats);
        if(response.status === 200){
            let skillsArray = response.data.userSkills;
            console.log(skillsArray)
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_SKILLS,
                payload: skillsArray
            })
        }
        else{
            console.log("API FAILED TO GET THE SKILLS");
        }
    }
    store.completeQuest = async function(stats, id, name, date, completionNote){
        await api.addAchievement(name, stats, date, completionNote, auth.user.email)
        let response1 = await api.updateSkills(stats)
        let response2 = await api.deleteQuestById(id)
        let response3 = await api.retrieveAllUserQuests();

        
        if(response1.status === 200 && response2.status === 200 && response3.status === 200){
            let userSkills = response1.data.userSkills;
            let questsArray = response3.data.userQuests;
            storeReducer({
                type: GlobalStoreActionType.COMPLETE_QUEST,
                payload: userSkills,
                payload2: questsArray
            })
        }
        else{
            console.log("skillsUpdated? " + response1.status);
            console.log("questDeleted? " + response2.status);
        }
    }
    
    store.deleteQuestById = async function(id){
        let response = await api.deleteQuestById(id);
        //store.retrieveAllUserSkills();
        store.retrieveAllUserQuests();
    }

    store.retrieveAllUserAchievements = async function(){
        let response = await api.retrieveAllUserAchievements();
        if(response.status === 200){
            let achievementsArray = response.data.userAchievements;
            achievementsArray = achievementsArray.reverse()
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_USER_ACHIEVEMENTS,
                payload: achievementsArray
            })
        }
        else{
            console.log("API FAILED TO GET THE QUESTS");
        }
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