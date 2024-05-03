/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getDatabase, get, set, ref, push, child } from 'firebase/database';
import { initializeApp } from "firebase/app";

const { onSchedule } = require("firebase-functions/v2/scheduler")

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const updateDaily = onSchedule("every day 00:00", async (event) => {

    const db = getDatabase();
    let previousDailyTime = 0;

    let quote = getQuote();
    let prompt = getPrompt();

    get(ref(getDatabase(), `/Daily/lastUpdated`)).then((data) => {
        if(data.exists()){
            previousDailyTime = data.val();
            console.log(previousDailyTime);
        }
    }).then(async () =>{
        //if the user has created a Journal entry in the last day, it will update that entry instead of creating a new one
            //creates a new Journal entry in the database initialized with the user's input
        const DailyID = await push(child(ref(db), `/Daily/`), ).key;
        set(ref(db, `/Daily/${DailyID}`), DailyID);
        set(ref(db, `/Daily/lastUpdated`), Date.now());
        set(ref(db, `/Daily/${Date.now}/`), DailyID);
        set(ref(db, `/Daily/${Date.now}/`), quote);
        set(ref(db, `/Daily/${Date.now}/`), prompt);
    });
})