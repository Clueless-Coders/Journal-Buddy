//File for initializing Firebase
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

//Modify this for updating firebase config, duh
const firebaseConfig = {
    databaseURL: "https://journal-buddy-bfa71-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

