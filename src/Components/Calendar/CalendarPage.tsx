import React, { memo, useCallback, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Calendar, Agenda, CalendarList, CalendarProvider, AgendaList, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import isEmpty from 'lodash/isEmpty';
//import { MarkedDates } from'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import AgendaItem from '../Calendar/AgendaItem';
import { Habit, getHabitsByCurrentUser } from '../../firebase/Database';
import { getAuth } from 'firebase/auth';
import { onValue, ref, getDatabase, get, child } from 'firebase/database';
import { Markings } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';


//huge thanks to "react-native-calendars" for being what we want immediately with no drawbacks...

//Dates for general reference
const timeRange = 4; //our total time reference
const bias = 1; //how many days we want to find for, both future and past
const pastAndTodayDate = getPastDates(timeRange - bias);
const futureDates = getFutureDates(timeRange - bias);

//this is our arrays for accessing dates
const dates: Date[] = pastAndTodayDate.concat(futureDates);

//require pngs in this path file
//modify if changing icons tho
const leftArrowIcon = require('../Calendar/previous.png');
const rightArrowIcon = require('../Calendar/next.png');

//Interface in which we're passing the date as a string and data as a Habit 
//Needs to be expanded to Habit[]
export interface AgendaItemData {
    date: string,
    data: Habit,
}

//Main array for agendaItems... duh
const agendaItems: any[] = [];

//Getting what dates we have data in, i.e. habits in each day
function getMarkedDates() {
  const marked: MarkedDates = {};
  
  //Checks through all agendaItems, and marks them in the expandable calendar
  agendaItems.forEach(item => {
    let val = item.date;
    if (item.data != null && !isEmpty(item.data)) {
      marked[val] = { marked: true };
    } else {
      marked[val] = { disabled: true };
    }
  });
  return marked;
}

//function to return theme. should be abstracted in later git commits
function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: '#00AAAF',
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontWeight: 'bold' as const,
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontWeight: 'normal' as const,
    // dates
    dayTextColor: '#00AAAF',
    todayTextColor: '#af0078',
    textDayFontSize: 18,
    textDayFontWeight: '500' as const,
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: '#00AAAF',
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: '#00AAAF',
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: -2 }
  };
}

//creates an array, queries through it and sets new future dates
function getFutureDates(numberOfDays: number) {
  const array: Date[] = [];
  for (let index = 0; index < numberOfDays; index++) {
    let d = Date.now();
    //need to fix updating dates for next month!
    //Right now it's still alright, but need more testing.
    if (index > 8) {
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    array.push(date);
  }
  return array;
}
//Subtracts 864000 seconds per day from right now
//gets our furthest past date AND adds dates inbetween of the past date to notw
function getPastDates(numberOfDays: number) {
  let pastDates = [];
  for (let i = numberOfDays; i > 0; i--) {
    pastDates.push(new Date(Date.now() - 864e5 * i));
    //.toISOString().split('T')[0]
  }
  return pastDates;
}

//Props to pass into page, for right now just a bool for week/expandable calendar
interface Props {
  weekView?: boolean;
}

//actual component we throw into 
const CalendarPage = (props: Props) => {
  //General consts, mostly using ref to call functions
  const { weekView } = props;
  const marked = useRef(getMarkedDates()); //getting the dates to mark on expandable calendar
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({ todayButtonTextColor: '#00AAAF' });
  //the rendering method for each AgendaItem
  const renderItem = useCallback((item: any) => {return <AgendaItem items={item}/>},[]);

//Database call for all habits (current user)
let [temp, setTemp] = React.useState([] as []);

//writes to above array for all habits
//Copied from Trina's database logic
//needs further refining for parsing each individual habit
React.useEffect(() => {
  let ignore = false;
  async function getHabits(){
      getHabitsByCurrentUser().then((habits) => {
          if(!ignore){
              console.log("entering calender");
              let i = 0;
              habits.forEach((childsnap) => { 
                agendaItems[i] = {date: dates[i].toISOString().split('T')[0], data: childsnap};
                //console.log("woah" + agendaItems[i]);
                i++;
              })
              setTemp(temp);
          }
      });
  }
  //I *think* this actually calls it, not so sure with how Firebase is kind of terse
    onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/habits`), () =>{
        getHabits();
    })
    return () => {ignore = true};
}, []);

  //main calendar page rendering
  //As of now, AgendaItems don't render with how the documentation/implementation of AgendaList is
  //i.e. specifying how the type is calls a error for no reason UNLESS you specify it to specifically "any"
  //I get it's Typescript stuff, but man is it strict.

  //Given how somewhat "accessible" the AgendaItem/AgendaList component, we can rewrite this later
  //But alas, only works if you hardcode it for right now :(
  return (
    <CalendarProvider date={pastAndTodayDate[pastAndTodayDate.length - 1].toISOString().split('T')[0]} theme={todayBtnTheme.current}>
      {weekView ? (<WeekCalendar testID={'menu'} firstDay={1} markedDates={marked.current} />)
        : (<ExpandableCalendar testID={'menu'} theme={theme.current} firstDay={1} markedDates={marked.current} leftArrowImageSource={leftArrowIcon} rightArrowImageSource={rightArrowIcon} />)}
      <AgendaList sections={agendaItems} renderItem={renderItem} sectionStyle={styles.section}/>
    </CalendarProvider>
  );
};
export default CalendarPage;


//styles. should move getTheme into here honestly
//will do later :)
const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    flex: 1,
    backgroundColor: 'black',
    color: '#1c2833',
    textTransform: 'capitalize',
    fontSize: 20,
  }
});
