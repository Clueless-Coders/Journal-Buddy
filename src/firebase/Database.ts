import { get, set, child, ref, getDatabase, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export type UserData = {
    habits: string[], //holds unique idents for habits
    journals: string[],
    firstSignIn: boolean
};

export type Journal = {
   user: string, //unique ident for owner of this journal
   entry: string,
   dateWritten: string 
};

export type Habit = {
    daysToComplete: ("sun" | "m" | "tu" | "w" | "th" | "f" | "sat")[],
    timesToComplete?: {
        hour: number,
        minute: number,
        afternoon: boolean //is in the afternoon?
    }[], //can have multiple times of day to complete the task
    title: string,
    description?: string
    uid: string //unique identifier for this specific habit
    user: string, //unique ident for habit owner user
    endDate: string//time to stop habit
};

export function createUser(userID: string | undefined) {
    const rootRef = ref(getDatabase());
    const initData = {
        firstSignIn: true
    } as UserData;
    console.log(userID);

    set(child(rootRef, `/users/${userID}`), initData).catch((error) => console.log(error));
}

export function createJournal(journal: Journal) {
    const rootRef = ref(getDatabase()); 
    const journalUID = push(child(rootRef, `/journals/`), journal).key;
    set(ref(getDatabase(), `/users/${getAuth().currentUser?.uid}/journals/${journalUID}`), journalUID);
}

export function createHabit(
        daysToComplete: ("sun" | "m" | "tu" | "w" | "th" | "f" | "sat")[], 
        timesToComplete: { hour: number, minute: number, afternoon: boolean }[],
        title: string,
        endDate: string,
        description?: string){
    
    const newHabit: Habit = {
        daysToComplete: daysToComplete.reduce((a, v) => ({ ...a, [v]: v}), {}) ,
    };

    const rootRef = ref(getDatabase()); 
    const habitlUID = push(child(rootRef, `/habits/`), newHabit).key;
    set(ref(getDatabase(), `/users/${getAuth().currentUser?.uid}/habits/${habitlUID}`), habitlUID);
}