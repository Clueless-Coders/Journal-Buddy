import isEmpty from 'lodash/isEmpty';
import React, {memo, useCallback} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import { Habit } from '../../firebase/Database';
import CheckboxButton from '../Buttons/CheckboxButton';

const yes = 'green';
const no = "red";

interface ItemProps {
  item: any
}


//actual item; change props : ItemProps to props : Habit
const AgendaItem = (props: ItemProps) => {
  let isHabitDone = false;
    let item = props.item;

  //let isHabitDone = props.;

  //Show a popup when you click the "see more" button
  const buttonPressed = useCallback(() => {
    isHabitDone = !isHabitDone;
    Alert.alert("Habit updated!");
  }, []);

  //Same thing for getting info for a particular habit
  const itemPressed = useCallback(() => {
    let string = isHabitDone ? "Habit: Done!" : "Habit: Not done!";
    Alert.alert(item.title, string + "\nDuration: " + item.duration);
  }, []);

  //Return something indicating a empty list of habit if no habits made
  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  //The actual item drawing thing
  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID={'item'}>
      <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
          <CheckboxButton checked = {isHabitDone} onPress={buttonPressed} buttonText='Update Habit' containerStyle={styles.buttonStyle}></CheckboxButton>
      </View>
    </TouchableOpacity>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
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
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    width: 10,
    height: 20,
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
    height: 40, 
    width: 190,
  },
});