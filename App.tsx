import DailyPrompt from './src/Components/Journal-Pages/DailyPrompt';
import { View } from 'react-native';
import React from 'react';
import JournalEntries from './src/Components/Journal-Pages/JournalEntries';


//TODO: Allow each page to change the currentPage state in order to switch which page is being displayed.
//TODO: Create bottom taskbar
export default function App() {
  var [currentPageID, setCurrentPage] = React.useState(1);
  let currentPage: React.JSX.Element = <View />;

  switch(currentPageID){
    case 0: currentPage = <DailyPrompt />; break;
    case 1: currentPage = <JournalEntries />; break;
    default: currentPage = <DailyPrompt />;
  }
  return (
      currentPage
  );
}
