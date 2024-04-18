import React, {useCallback, useRef, useState} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {Calendar, Agenda, CalendarList, CalendarProvider, AgendaList, ExpandableCalendar, WeekCalendar} from 'react-native-calendars';
import isEmpty from 'lodash/isEmpty';
import { MarkedDates } from 'react-native-calendars/src/types';
import AgendaItem from '../AgendaItem';

//huge thanks to "react-native-calendars" for being what we want immediately with no drawbacks...
//except please don't abstract your example code that much next time

//Dates for general reference
//Today, 3 days ago, and the future days
const today = new Date().toISOString().split('T')[0];
const pastDate = getPastDate(3);
const futureDates = getFutureDates(12);
//this is our arrays for accessing dates
const dates = [pastDate, today].concat(futureDates);

//require pngs in this path file
//modify if changing icons tho
const leftArrowIcon = require('../TempPictures/previous.png');
const rightArrowIcon = require('../TempPictures/next.png');

//general colors used in Theme and generally across this entire file
const themeColor = '#00AAAF';
const lightThemeColor = '#f2f7f7';

//Actual data for habits to be tracked
//it's massive so please collapse
//refer to this for database stuff!!!
const agendaItems = [
  {
    title: dates[0],
    data: [{hour: '12am', duration: '1h', title: 'First Yoga'}]
  },
  {
    title: dates[1],
    data: [
      {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
      {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}
    ]
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {
    title: dates[3],
    data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]
  },
  {
    title: dates[4],
    data: [{}]
  },
  {
    title: dates[5],
    data: [
      {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'}
    ]
  },
  {
    title: dates[6], 
    data: [
      {hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}
    ]
  },
  {
    title: dates[7], 
    data: [{}]
  },
  {
    title: dates[8],
    data: [
      {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'}
    ]
  },
  {
    title: dates[9],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {
    title: dates[10], 
    data: [
      {hour: '12am', duration: '1h', title: 'Last Yoga'}
    ]
  },
  {
    title: dates[11],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {
    title: dates[12], 
    data: [
      {hour: '12am', duration: '1h', title: 'Last Yoga'}
    ]
  },
  {
    title: dates[13], 
    data: [
      {hour: '12am', duration: '1h', title: 'Last Yoga'}
    ]
  }
];
const ITEMS: any[] = agendaItems;

//Getting what dates we have data in, i.e. habits in each day
function getMarkedDates() { 
  const marked: MarkedDates = {};

  agendaItems.forEach(item => {
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])){
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
    expandableKnobColor: themeColor,
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
    dayTextColor: themeColor,
    todayTextColor: '#af0078',
    textDayFontSize: 18,
    textDayFontFamily: 'Inter_400Regular',
    textDayFontWeight: '500' as const,
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -2}
  };
}


//creates an array, queries through it and sets new future dates
function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
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
function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

//dunno actually, please explain.
interface Props {
  weekView?: boolean;
}

//actual component we throw into 
const CalendarPage = (props: Props) => {
  const {weekView} = props;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({todayButtonTextColor : '#00AAAF' });

  const renderItem = useCallback(({item}: any) => {
    return <AgendaItem item={item}/>;
   }, []);              

  return (
    <CalendarProvider date = {ITEMS[1]?.title} showTodayButton theme = {todayBtnTheme.current} > 
  
    //logic for expandable calendar rendering
    {weekView ? ( <WeekCalendar testID={'menu'} firstDay={1} markedDates={marked.current}/>
      ) : (
        <ExpandableCalendar
          testID={'menu'}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          //requires pngs for arrows
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}

      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};
export default CalendarPage;


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
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  }
});

