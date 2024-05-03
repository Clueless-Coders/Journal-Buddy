import React, {memo, useCallback, useRef, useState} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {Calendar, Agenda, CalendarList, CalendarProvider, AgendaList, ExpandableCalendar, WeekCalendar} from 'react-native-calendars';
import isEmpty from 'lodash/isEmpty';
import { MarkedDates } from 'react-native-calendars/src/types';
import AgendaItem from '../Calendar/AgendaItem';
import { Habit } from '../../firebase/Database';

//huge thanks to "react-native-calendars" for being what we want immediately with no drawbacks...
//except please don't abstract your example code that much next time

//Dates for general reference
const timeRange = 5; //our total time reference
const bias = 2 //how many days we want to find for, both future and past
const pastAndTodayDate = getPastDates(timeRange - bias);
const futureDates = getFutureDates(timeRange - bias);
//this is our arrays for accessing dates
const dates = pastAndTodayDate.concat(futureDates);

//require pngs in this path file
//modify if changing icons tho
const leftArrowIcon = require('../Calendar/previous.png');
const rightArrowIcon = require('../Calendar/next.png');

const agendaItems: {title: string, data: Habit[]} [] = [];

//Actual data for habits to be tracked
//Populating our date array using... arrays.
for (let i = 0; i < dates.length; i++){
  agendaItems.push(
    {
      //title, date in UTC format
      //data: array of objects that each have properties to be displayed
      //The data will be the stuff we poll from the database
      title: dates[i],
      data: [{duration: '1h', title: 'fortnite', description: 'gooning'}]
    });
    //Should update to being generative with database info later on
}

//Getting what dates we have data in, i.e. habits in each day
function getMarkedDates() { 
  const marked: MarkedDates = {};
  agendaItems.forEach(item => {
    if (item.data.length > 0 && !isEmpty(item.data[0])){
      marked[item.title] = {marked: true};
    } else {
      marked[item.title] = {disabled: true};
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
  const array: string[] = [];
  for (let index = 0; index < numberOfDays; index++) {
    let d = Date.now();
    //need to fix updating dates for next month!
    if (index > 8) {
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
//Subtracts 864000 seconds per day from right now, and get our furthest past date
function getPastDates(numberOfDays: number) {
  let pastDates = [];
  for (let i = numberOfDays; i > 0; i--){
      pastDates.push(new Date(Date.now() - 864e5 * i).toISOString().split('T')[0]);
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
  const renderItem = useCallback(({item}: any) => {return <AgendaItem item={item}/>; }, []);           

  return (
    <CalendarProvider date = {pastAndTodayDate[pastAndTodayDate.length-1]} theme = {todayBtnTheme.current}> 
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
