import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity} from 'react-native';
import CheckboxButton from '../Buttons/CheckboxButton';
import { AgendaItemData } from './CalendarPage';

//Props. Props.
interface Props {
  items: AgendaItemData;
}

const AgendaItem = (props: Props) =>  {
  //General vars, isHabitDone-esque logic needs to be moved to the database for "saving" user habit done data.
  let isHabitDone = false;
  let item = props.items;
  
  //Show a popup when you click the "see more" button
  const buttonPressed = useCallback(() => {
    isHabitDone = !isHabitDone;
    Alert.alert("Habit updated!");
  }, []);

  //Same thing for getting info for a particular habit
  const itemPressed = useCallback(() => {
    let string = isHabitDone ? "Habit: Done!" : "Habit: Not done!";
    Alert.alert(item.data.description == null ? "null" : item.data.description, string);
   // +"\nDuration: " + item.data[0].description == null ? "epic" : item.data[0].description
  }, []);

  //Return something indicating a empty list of habit if no habits made
  if (item.data == null) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }
  //The actual item drawing thing
  //currently broken since trying to implement Habit interfadce
  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID={'item'}>
      <View>
          <Text style={styles.itemHourText}>{item.date}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.data.title}</Text>
      <View style={styles.itemButtonContainer}>
          <CheckboxButton checked = {isHabitDone} onPress={buttonPressed} buttonText='Update Habit' containerStyle={styles.buttonStyle}></CheckboxButton>
      </View>
    </TouchableOpacity>
  );
};

export default AgendaItem;

//Styles.. Styles.
const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 20,
    padding: 20,
    backgroundColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    minHeight: 20,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  },
  buttonStyle: {
    color: 'black',
    height: 45, 
    width: 190,
    alignItems: 'center'
  },
});