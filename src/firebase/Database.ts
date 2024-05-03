import { get, set, child, ref, getDatabase, push } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const MILLISECONDS_IN_DAY = 86400000;
const SUBMIT_HABIT_COOLDOWN_MILLISECONDS = 10000;

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
   entry: string, //actual entry text
   dayWritten: number, //unix timestamp
   uid?: string
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
    timesToComplete: {
        [index: string]: { //
            time: number, //ms from 12 am that day
        }
         //is in the afternoon?
    }, //can have multiple times of day to complete the task
    title: string,
    description?: string
    uid: string //unique identifier for this specific habit
    user?: string, //unique ident for habit owner user
    endDate?: number,//Unix timestamp
    duration?: string,
    timesCompleted?: {
        [index: string]: {
            timeCompleted: number, //unix time
        }
    }
};



//Initializes user with flag to complete first-time account setup
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
    //obtains the last time the user has instantiated a new Journal entry in Unix time (stored in user profile)
    get(ref(getDatabase(), `/users/${user}/lastJournalEntryTime`)).then((data) => {
        if(data.exists()){
            previousJournalTime = data.val();
            console.log(previousJournalTime);
        }
    }).then(async () =>{
        //if the user has created a Journal entry in the last day, it will update that entry instead of creating a new one
        if(previousJournalTime !== 0 && Date.now() - previousJournalTime < MILLISECONDS_IN_DAY){
            get(ref(getDatabase(), `/users/${user}/lastJournalEntryID`)).then((data) => {
                //if somehow the database managed to store the time and not the entry ID, something has gone terribly wrong
                if(data.exists()){
                    set(child(ref(db), `/journals/${data.val()}/entry`), journal.entry); 
                }
            });
        } else {
            //creates a new Journal entry in the database initialized with the user's input
            const journalUID = await push(child(ref(db), `/journals/`), journal).key;
            set(ref(db, `/users/${user}/journals/${journalUID}`), journalUID);
            set(ref(db, `/users/${user}/lastJournalEntryTime`), Date.now());
            set(ref(db, `/users/${user}/lastJournalEntryID`), journalUID);
        }
    });
}

//Use the predefined Habit type in order to pass in the object to this method
//saves the habit data in the habits database directory
export function createHabit(newHabit: Habit){
    //initiallize database reference & obtain userID
    const db = getDatabase(); 
    const user = getAuth().currentUser?.uid;
    //exits if there was an issue with authentication
    if(user === null || user === undefined) 
        return;

    let previousHabitTime = 0;
    //obtains the last time the user has instantiated a new Journal entry in Unix time (stored in user profile)
    get(ref(getDatabase(), `/users/${user}/lastHabitEntryTime`)).then((data) => {
        if(data.exists()){
            previousHabitTime = data.val();
        }
    }).then(async () =>{
        //if the user has created a Journal entry in the last day, it will update that entry instead of creating a new one
        if(Date.now() - previousHabitTime < SUBMIT_HABIT_COOLDOWN_MILLISECONDS){
            get(ref(getDatabase(), `/users/${user}/lastHabitlEntryID`)).then((data) => {
                //if somehow the database managed to store the time and not the entry ID, something has gone terribly wrong
                if(data.exists()){
                    set(child(ref(db), `/habits/${data.val()}`), newHabit); 
                }
            });
        } else {
            //creates a new Journal entry in the database initialized with the user's input
            const habitUID = await push(child(ref(db), `/habits/`), newHabit).key;
            set(ref(db, `/users/${user}/habits/${habitUID}`), habitUID);
            set(ref(db, `/users/${user}/lastHabitEntryTime`), Date.now());
            set(ref(db, `/users/${user}/lastHabitEntryID`), habitUID);
            
        }
    });
}

export async function addHabitTime(habitID: string){
    const db = getDatabase(); 
    if(habitID === undefined){
        console.log("Undefined id");
        return;
    }
    let currentTime = Date.now();
    await push(child(ref(db), `/habits/${habitID}/timesCompleted`), currentTime);
    //obtains the last time the user has instantiated a new Journal entry in Unix time (stored in user profile)
    ///push(child(ref(db), `/habits/${habitID}/timesCompleted`), Date.now());
}


//Queries the database for all the journals created by this user
export async function getJournalsByUserID(userID: string): Promise<Journal[]>{
    //Grabs all the Journal data references under the user's profile
    return new Promise((resolve, reject) => get(ref(getDatabase(), `/users/${userID}/journals`)).then((data) => {
        if(data.exists()) {
            let promises: Promise<Journal>[] = [];
            //for every reference, attempts to access its data
            Object.entries(data.val()).forEach((entry) => {
                let promise = getJournalByID(Object.values(entry)[0] as string);
                promises.push(promise);
            });

            //waits for all DB queries to finish, then returns the journals as an Array
            Promise.all(promises).then((journals) => {
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
    //Grabs all the Habit data references under the current user
    return new Promise((resolve, reject) => get(ref(getDatabase(), `/users/${userID}/habits`)).then((data) => {
        if(data.exists()) {
            let promises: Promise<Habit>[] = [];
            //for each Habit reference, attempts to retrieve that data from the DB
            Object.entries(data.val()).forEach((entry) => {
                let promise = getHabitByID(Object.values(entry)[0] as string);
                promises.push(promise);
            });
            //wait for the queries to complete, then return an array containing the Habits 
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

//return journals under the userID of the current logged-in user
export async function getJournalsByCurrentUser(): Promise<Journal[]> {
    let userID = getAuth().currentUser?.uid;
    if(userID === null || userID === undefined)
        return [];

    return getJournalsByUserID(userID);
}

//return habits under the userID of the current logged-in user
export async function getHabitsByCurrentUser(): Promise<Habit[]>  {
    let userID = getAuth().currentUser?.uid;
    if(userID === null || userID === undefined)
        return [];

    return getHabitsByUserID(userID);
}

//returns the journal data specified by the journalID
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

//returns the habit data specified by the journalID
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



export function login (email: string, password: string) {
    signInWithEmailAndPassword(getAuth(), email, password);
}

export function signup (email: string, password: string) {
    createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
        createUser(userCredential.user?.uid)
    });
}

