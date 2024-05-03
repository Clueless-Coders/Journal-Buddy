/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {getDatabase, get, set, ref, push, child} from "firebase/database";
import {initializeApp} from "firebase/app";
import OpenAI from "openai";
import {openAIKey, firebaseConfig} from "./key";
import {onSchedule} from "firebase-functions/v2/scheduler";

const quoteURL = "https://zenquotes.io/api/quotes/";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const openai = new OpenAI(openAIKey);

/**
 * Gets Daily Quote from ZenQuote
 */
async function getQuote() {
  const resp = await fetch(quoteURL);
  const respJSON = await resp.json();
  console.log(respJSON);
  return respJSON;
}

/**
 * Gets journal prompt from ChatGPT API
 */
async function getPrompt() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Generate a single unique journal prompt 
        that will help me reflect on events that happened today`,
      },
      {
        role: "user",
        content:
          "Generate a journal topic for a user to write about in their journal",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  return completion.choices[0];
}

export const updateDaily = onSchedule("every day 00:00", async () => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  let previousDailyTime = 0;

  const quote = await getQuote();
  const prompt = await getPrompt();

  get(ref(getDatabase(), "/Daily/lastUpdated"))
    .then((data) => {
      if (data.exists()) {
        previousDailyTime = data.val();
        console.log(previousDailyTime);
      }
    })
    .then(async () => {
      const DailyID = await push(child(ref(db), "/Daily/")).key;
      set(ref(db, `/Daily/${DailyID}`), DailyID);
      set(ref(db, "/Daily/lastUpdated"), Date.now());
      set(ref(db, `/Daily/${Date.now}/`), DailyID);
      set(ref(db, `/Daily/${Date.now}/`), quote);
      set(ref(db, `/Daily/${Date.now}/`), prompt);
    });
});
