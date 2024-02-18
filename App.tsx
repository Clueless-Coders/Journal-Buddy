import DailyPrompt from './src/Components/Journal-Pages/DailyPrompt';
import { View } from 'react-native';
import React from 'react';


//TODO: Allow each page to change the currentPage state in order to switch which page is being displayed.
//TODO: Create bottom taskbar
export default function App() {
  var [currentPageID, setCurrentPage] = React.useState(0);
  let currentPage: React.JSX.Element = <View />;

  switch(currentPageID){
    case 0: currentPage = <DailyPrompt />; break;
    default: currentPage = <DailyPrompt />;
  }
  return (
      currentPage
  );
}
