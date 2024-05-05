import React, {memo, useCallback, useRef, useState} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {Calendar, Agenda, CalendarList, CalendarProvider, AgendaList, ExpandableCalendar, WeekCalendar} from 'react-native-calendars';
import isEmpty from 'lodash/isEmpty';
//import { MarkedDates } from'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import AgendaItem, { AgendaItemData } from '../Calendar/AgendaItem';
import { Habit, getHabitsByCurrentUser } from '../../firebase/Database';
import { getAuth } from 'firebase/auth';
import { onValue, ref, getDatabase } from 'firebase/database';
import { Markings } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';

//huge thanks to "react-native-calendars" for being what we want immediately with no drawbacks...
//except please don't abstract your example code that much next time

//Dates for general reference
const timeRange = 2; //our total time reference
const bias = 1 //how many days we want to find for, both future and past
const pastAndTodayDate = getPastDates(timeRange - bias);
const futureDates = getFutureDates(timeRange - bias);

//this is our arrays for accessing dates
const dates : Date[] = pastAndTodayDate.concat(futureDates);

//require pngs in this path file
//modify if changing icons tho
const leftArrowIcon = require('../Calendar/previous.png');
const rightArrowIcon = require('../Calendar/next.png');

const agendaItems: AgendaItemData [] = [];

//Database call for all habits (current user)
let [temp, setTemp] = React.useState([] as Habit[])

//writes to above array for all habits
React.useEffect(() => {
let flag = false;
//copy of Trina's habit code 
async function getHabits() {
  getHabitsByCurrentUser().then((habits) => {
    if (!flag){
      for (let i = 0; i < dates.length; i++){
        agendaItems.push(
          {
            //title, date in UTC format
            //data: array of objects that each have properties to be displayed
            date: dates[i],
            data: [temp[i]],
          });
      }
      setTemp(habits)
    }
  });
}
onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/habits`), (data) =>{
  getHabits();
})
return () => {flag = true};
}, []);

//Getting what dates we have data in, i.e. habits in each day
function getMarkedDates() { 
  const marked: MarkedDates = {};
  agendaItems.forEach(item => {
    let val = item.date.toISOString().split('T')[0];
    if (item.data.length > 0 && !isEmpty(item.data[0])){
      marked[val] = {marked: true};
    } else {
      marked[val] = {disabled: true};
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
    arrowStyle: {padding: 0},
    // knob
    expandableKnobColor: '#00AAAF',
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontFamily: 'Inter_400Regular',
    textMonthFontWeight: 'bold' as const,
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'Inter_400Regular',
    textDayHeaderFontWeight: 'normal' as const,
    // dates
    dayTextColor: '#00AAAF',
    todayTextColor: '#af0078',
    textDayFontSize: 18,
    textDayFontFamily: 'Inter_400Regular',
    textDayFontWeight: '500' as const,
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // selected date
    selectedDayBackgroundColor: '#00AAAF',
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: '#00AAAF',
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -2}
  };
}

//creates an array, queries through it and sets new future dates
function getFutureDates(numberOfDays: number) {
  const array: Date[] = [];
  for (let index = 0; index < numberOfDays; index++) {
    let d = Date.now();
    //need to fix updating dates for next month!
    if (index > 8) {
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    //const dateString = date.toISOString().split('T')[0];
    array.push(date);
  }
  return array;
}
//Subtracts 864000 seconds per day from right now, and get our furthest past date
function getPastDates(numberOfDays: number) {
  let pastDates = [];
  for (let i = numberOfDays; i > 0; i--){
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
  const {weekView} = props;
  const marked = useRef(getMarkedDates()); //getting the dates to mark on expandable calendar
  const theme = useRef(getTheme()); //
  const todayBtnTheme = useRef({todayButtonTextColor : '#00AAAF' });
  //the rendering method for each AgendaItem
  const renderItem = useCallback(({item}: any) => {return <AgendaItem {item} />; }, []);           

  return (
    <CalendarProvider date = {pastAndTodayDate[pastAndTodayDate.length-1].toISOString().split('T')[0]} theme = {todayBtnTheme.current}> 
    {weekView ? (<WeekCalendar testID={'menu'} firstDay={1} markedDates={marked.current}/>) 
              : (<ExpandableCalendar testID={'menu'} theme={theme.current} firstDay={1} markedDates={marked.current} leftArrowImageSource={leftArrowIcon} rightArrowImageSource={rightArrowIcon} /> )}
      <AgendaList sections={agendaItems} renderItem={renderItem} sectionStyle={styles.section}/>
    </CalendarProvider>
  );
};
export default memo(CalendarPage);


//styles. should move getTheme into here honestly
//will do later :3
const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: '#f2f7f7',
    color: '#1c2833',
    textTransform: 'capitalize',
    fontSize: 20,
  }
});
