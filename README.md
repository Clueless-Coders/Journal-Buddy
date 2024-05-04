<img src="https://github.com/CSC-3380-Spring-2024/Journal-Buddy/assets/111524307/77832e73-1c0a-4fab-8173-431279ccd6e3" width="400" height="400" />

# Journal Buddy

## Getting Started!
Prerequisites: Node.js, Android or iOS emulator (recommended) **OR** Expo Go app through the app store (easy to use)

### Installing and running:
1. Open a terminal in the folder you wish to install the app
2. Clone the repository by running this command: `git clone https://github.com/CSC-3380-Spring-2024/Journal-Buddy.git`
3. Change folder to project using `cd Journal-Buddy`, then run `npx expo install` to download dependencies
4. Start the Expo server using the `npx expo start`

#### If you are using the Expo Go app
- Ensure your phone is connected to the same network as the computer running the Expo server, or it **will not work**!
- Scan the QR code displayed in the terminal to open the app on Expo Go

#### If you are using an Emulator
- Open the emulator you wish to use
- Press the corresponding key to open the emulator

#### Web does not work :)

## Features

### Dynamically generated Prompt and Quote Of The Day
Fetches a quote and automatically generates a journal prompt every day to keep you motivated!
The Quote Of The Day is shown on the home menu as soon as you log in
The Journal Prompt Of The Day is shown when creating your daily journal entry

### Accounts/Authentication
Keeping your data secure using proper authentication flow, and preventing others from accessing your data through security rules.
Additionally, your data is synced to the cloud, so you can carry your data on one device to the next!

### Journaling Tracker
This app allows you to create a journal based on a daily prompt! Each journal is stored in the cloud, 
and you can access the journal at any time using the journal history!

### Habit Tracking
Need help organizing your day? Our Habit tracker allows you to create habits you would like to keep up! You can mark them complete through the home
menu, as well as seeing your completion history in the calendar page!

### Calendar
A centralized place to view all of your daily habits and journal entries! Helps you keep yourself accountable by showing you how much
you really complete the habits you're tracking and your journal entries.

## API Key
If you are given the permission to work on the production build, the API Key file should be named and placed in this directory:
`~/Journal-Buddy/Keys.ts`

To request access, please contact <a href="mailto:tdesot3@lsu.edu">Tristan Desoto</a> 