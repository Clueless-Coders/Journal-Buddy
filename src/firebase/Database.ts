import { get, set, child, ref, getDatabase, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

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
    firstSignIn: boolean
};

export type Journal = {
   user: string, //unique ident for owner of this journal
   entry: string,
   dateWritten: string 
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
    endDate: {
        month: number,
        day: number,
        year: number
    }
};

export function createUser(userID: string | undefined) {
    const rootRef = ref(getDatabase());
    const initData = {
        firstSignIn: true
    } as UserData;
    console.log(userID);

    set(child(rootRef, `/users/${userID}`), initData).catch((error) => console.log(error));
}

//Use the predefined Journal type in order to pass in the object to this method
//saves the Journal data in the habits database directory
export function createJournal(journal: Journal) {
    const rootRef = ref(getDatabase()); 
    const journalUID = push(child(rootRef, `/journals/`), journal).key;
    set(ref(getDatabase(), `/users/${getAuth().currentUser?.uid}/journals/${journalUID}`), journalUID);
}

//Use the predefined Habit type in order to pass in the object to this method
//saves the habit data in the habits database directory
export function createHabit(newHabit: Habit){
    const rootRef = ref(getDatabase()); 
    const habitlUID = push(child(rootRef, `/habits/`), newHabit).key;
    set(ref(getDatabase(), `/users/${getAuth().currentUser?.uid}/habits/${habitlUID}`), habitlUID);
}