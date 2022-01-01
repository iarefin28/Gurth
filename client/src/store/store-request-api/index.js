/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author Ishan Arefin
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

const workoutapi = axios.create({
    baseURL: 'http://localhost:4000/workoutapi',
})

const diaryapi = axios.create({
    baseURL: 'http://localhost:4000/diaryapi',
})

//THESE ARE THE REQUESTS THAT PERTAIN TO THE QUEST SYSTEM
export const createNewQuest = (questName, endDate, statsToUpdate, email) => {
    return api.post(`/quests/`, {
        // SPECIFY THE PAYLOAD
        nameOfQuest: questName,
        endDate: endDate,
        increase_stat: statsToUpdate,
        ownerEmail: email
    })
}

export const retrieveAllUserQuests = () => {
    return api.get(`/allquests/`);
}

export const deleteQuestById = (id) => api.delete(`/quests/${id}`)

//THESE ARE THE REQUESTS THAT PERTAIN TO THE SKILL SYSTEM
export const addSkill = (skillName) => {
    return api.post(`/skills/`, {
        // SPECIFY THE PAYLOAD
        skillName: skillName
    })
}

export const updateSkills = (stats) => {
    return api.post(`/updateskills`, {
        skillsToUpdate: stats
    })
}

export const retrieveAllUserSkills = () => {
    return api.get(`/allskills/`);
}

//THESE ARE THE REQUESTS THAT PERTAIN TO THE WORKOUTS 
export const addNewWorkout = (date, musclesHit, exercisesArr, email) => {
    return workoutapi.post(`/workouts/`, {
        // SPECIFY THE PAYLOAD
        workoutDate: date,
        musclesHit: musclesHit,
        exercises: exercisesArr,
        ownerEmail: email
    })
}

export const retrieveAllWorkouts = () => {
    return workoutapi.get(`/allworkouts/`);
}

export const retrieveAllWorkoutsByDate = (dateString) => workoutapi.get(`/datedworkouts/${dateString}`);

export const addDiaryEntry = (entry, date, time) => {
    return diaryapi.post(`/addentry/`, {
        // SPECIFY THE PAYLOAD
        entryContents: entry,
        postDate: date,
        postTime: time
    })
}

export const getEntryByDate = (date) => diaryapi.get(`/entry/${date}`);



const apis = {
    createNewQuest,
    retrieveAllUserQuests,
    deleteQuestById,
    addSkill,
    updateSkills,
    retrieveAllUserSkills,
    addNewWorkout,
    retrieveAllWorkouts,
    retrieveAllWorkoutsByDate,
    addDiaryEntry,
    getEntryByDate
}

export default apis
