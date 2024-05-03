/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {getDatabase, get, set, ref} from "firebase/database";
import {initializeApp} from "firebase/app";
import OpenAI from "openai";
import {openAIKey, firebaseConfig} from "./key";
import {onSchedule} from "firebase-functions/v2/scheduler";

const quoteURL = "https://zenquotes.io/api/random/";

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
        content: `You are a mental health expert 
        helping people think positively`,
      },
      {
        role: "user",
        content:
          "Generate a journal topic for a user to write about in their journal",
      },
    ],
    model: "gpt-3.5-turbo",
  });

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
      const day = new Date();
      const newDaily = {
        quote: quote[0],
        prompt: prompt.message.content,
      };
      console.log(newDaily);
      set(ref(db, `/Daily/${day.toDateString()}`), newDaily);
      set(ref(db, "/Daily/lastUpdated"), day.toDateString());
    });
});
