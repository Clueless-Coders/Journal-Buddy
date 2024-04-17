import { get, set, child, ref, getDatabase, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const SECONDS_IN_DAY = 86400
const SUBMIT_HABIT_COOLDOWN_SECONDS = 10;

export type UserData = {
    habits: {
        [uid: string]: {
            uid: string
        }
    }, //holds unique idents for habits
    journals: {
        [uid: string]: {
            uid: string
        }
    },
    lastJournalEntryTime?: number,
    firstSignIn: boolean
};

export type Journal = {
   user: string, //unique ident for owner of this journal
   entry: string,
   dayWritten: string
};

export type Habit = {
    daysToComplete: {
        sunday?: boolean,
        monday?: boolean,
        tuesday?: boolean, 
        wednesday?: boolean,
        thursday?: boolean,
        friday?: boolean,
        saturday?: boolean
    },
    timesToComplete?: {
        [index: number]: {
            hour: number,
            minute: number,
            afternoon: boolean
        }
         //is in the afternoon?
    }, //can have multiple times of day to complete the task
    title: string,
    description?: string
    uid: string //unique identifier for this specific habit
    user: string | undefined, //unique ident for habit owner user
    endDate?: {
        month: number,
        day: number,
        year: number
    }
};

export function createUser(userID: string) {
    const rootRef = ref(getDatabase());
    const initData = {
        firstSignIn: true
    } as UserData;
    console.log(userID);

    set(child(rootRef, `/users/${userID}`), initData).catch((error) => console.log(error));
}

//Use the predefined Journal type in order to pass in the object to this method
//saves the Journal data in the habits database directory
export async function createJournal(journal: Journal) {
    //initiallize database reference & obtain userID
    const db = getDatabase(); 
    const user = getAuth().currentUser?.uid;
    //exits if there was an issue with authentication
    if(user === null || user === undefined) 
        return;

    let previousJournalTime = 0;
    let previousJournalID = '';
    //obtains the last time the user has instantiated a new Journal entry in Unix time (stored in user profile)
    await get(ref(getDatabase(), `/users/${user}/lastJournalEntryTime`)).then((data) => {
        if(data.exists()){
            previousJournalTime = data.val();
            console.log(previousJournalTime);
        }
    });

    //if the user has created a Journal entry in the last day, it will update that entry instead of creating a new one
    if(previousJournalTime !== 0 && Date.now() - previousJournalTime < SECONDS_IN_DAY){
        await get(ref(getDatabase(), `/users/${user}/lastJournalEntryID`)).then((data) => {
            //if somehow the database managed to store the time and not the entry ID, something has gone terribly wrong
            if(data.exists()){
                set(child(ref(db), `/journals/${data.val()}`), journal); 
            }
        });   
        return;
    }

    //creates a new Journal entry in the database initialized with the user's input
    const journalUID = await push(child(ref(db), `/journals/`), journal).key;
    set(ref(db, `/users/${user}/journals/${journalUID}`), journalUID);
    set(ref(db, `/users/${user}/lastJournalEntryTime`), Date.now());
    set(ref(db, `/users/${user}/lastJournalEntryID`), journalUID);
}

//Use the predefined Habit type in order to pass in the object to this method
//saves the habit data in the habits database directory
export function createHabit(newHabit: Habit){
    const rootRef = ref(getDatabase()); 
    const habitlUID = push(child(rootRef, `/habits/`), newHabit).key;
    set(ref(getDatabase(), `/users/${getAuth().currentUser?.uid}/habits/${habitlUID}`), habitlUID);
}

//Queries the database for all the journals created by this user
export async function getJournalsByUserID(userID: string): Promise<Journal[]>{
    return new Promise((resolve, reject) => get(ref(getDatabase(), `/users/${userID}/journals`)).then((data) => {
        if(data.exists()) {
            let promises: Promise<Journal>[] = []
            Object.entries(data.val()).forEach((entry) => {
                let promise = getJournalByID(Object.values(entry)[0] as string);
                promises.push(promise);
            });

            Promise.all(promises).then((journals) => {
                console.log(journals);
                resolve(journals);
            });
        } else {
            console.log('Journal data does not exist');
            reject("Journals data does not exist");
        }
        
    }).catch((error) => {
        console.log(error);
        reject("A Firebase error has occurred");
    }));
}

//Queries the database for all the habits created by this user
export async function getHabitsByUserID(userID: string): Promise<Habit[]>{
    return new Promise((resolve, reject) => get(ref(getDatabase(), `/users/${userID}/habits`)).then((data) => {
        if(data.exists()) {
            let promises: Promise<Habit>[] = [];
            Object.entries(data.val()).forEach((entry) => {
                let promise = getHabitByID(Object.values(entry)[0] as string);
                promises.push(promise);
            });
            Promise.all(promises).then((habits) => {
                console.log(habits);
                resolve(habits);
            });
        } else{
            console.log('Habit data does not exist');
            reject("Habit data does not exist");
        }
    }).catch((error) => {
        console.log(error);
        reject("A Firebase error has occurred");
    }));
}

export async function getJournalsByCurrentUser(): Promise<Journal[]> {
    let userID = getAuth().currentUser?.uid;
    if(userID === null || userID === undefined)
        return [];

    return getJournalsByUserID(userID);
}

export async function getHabitsByCurrentUser(): Promise<Habit[]>  {
    let userID = getAuth().currentUser?.uid;
    if(userID === null || userID === undefined)
        return [];

    return getHabitsByUserID(userID);
}

export function getJournalByID(journalID: string): Promise<Journal>{
    return new Promise((resolve, reject) => {
        get(child(ref(getDatabase()), `/journals/${journalID}`)).then((data) => {
            if(data.exists()){
                resolve(data.val());
            } else {
                reject('Journal of this ID does not exist');
            }
        })
    })
}

export function getHabitByID(habitID: string): Promise<Habit>{
    return new Promise((resolve, reject) => {
        get(child(ref(getDatabase()), `/journals/${habitID}`)).then((data) => {
            if(data.exists()){
                resolve(data.val());
            } else {
                reject('Habit of this ID does not exist');
            }
        })
    })
}