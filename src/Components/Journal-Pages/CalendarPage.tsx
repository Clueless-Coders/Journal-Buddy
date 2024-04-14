import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Calendar, Agenda, CalendarList} from 'react-native-calendars';

const CalendarPage = () => {
  const [selected, setSelected] = useState('');

  return (
    <View>
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
      }}
    />
    </View>

  );
};
export default CalendarPage;


// const styles = StyleSheet.create({






// });