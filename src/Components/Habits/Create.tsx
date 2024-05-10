import React, { useContext } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import { createHabit, Habit } from '../../firebase/Database';
import { getAuth } from 'firebase/auth';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import DateTimePicker from '@react-native-community/datetimepicker';
import { daysOfWeek } from '../times';

export default function HabitPage({navigation}: any) {
    let [title, setTitle] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [daysSet, setDaysSet] = React.useState({
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });

    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
    const dayKeys = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const toggleDay = (index) => {
        const day = dayKeys[index];
        setDaysSet(prev => ({ ...prev, [day]: !prev[day] }));
    };

    let [timesToComplete, setTimesToComplete] = React.useState('');
    let [afternoon, setAfternoon] = React.useState('');
    
    const handleTimeInput = (input: string)=> {
        const timeInput = input.replace(/[^\d]/g, '');
        let formattedTime = timeInput;
        if (timeInput.length >= 3) {
          const hours = parseInt(timeInput.slice(0, 2), 10);
          const minutes = parseInt(timeInput.slice(2, 4), 10);

          if (hours > 12 || minutes > 59) return;

          if (timeInput.length === 3) {
            formattedTime = `${timeInput[0]}:${timeInput.substring(1)}`;
          } else if (timeInput.length === 4) {
            formattedTime = `${timeInput.substring(0, 2)}:${timeInput.substring(2)}`;
          }
        }
        setTimesToComplete(formattedTime);
    };
    
    const timeToMilliseconds = (time, afternoon) => {
        if (!time) return 0;
        const [hours, minutes] = time.split(':').map(Number);
        return ((hours % 12) + (afternoon === 'PM' ? 12 : 0)) * 3600000 + minutes * 60000;
    };
    
    let [endDate, setEndDate] = React.useState(new Date());
    const [endDatePicked, setEndDatePicked] = React.useState(false);

    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false)
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShow(false);

        if (event.type === 'set') { 
            setEndDate(currentDate);
            setEndDatePicked(true);
        }
        else if (event.type === 'dismissed') {
            setEndDatePicked(false);
        }
    };

      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

    const user = getAuth().currentUser?.uid;
    function handleCreateHabit() {
        let daysToComplete:{[index: string]:boolean} = daysSet;
        let times: {
            [index: string]: {
                [index: string]: number
            } //ms from 12 am that day
        } = {};
        
        for (let i = 0; i < daysOfWeek.length; i ++){
            let timeMS: number = timeToMilliseconds(timesToComplete, afternoon);
            let timeCounterKey: string = timeMS + '';
            if(daysToComplete[daysOfWeek[i]] ){

                times[daysOfWeek[i]] = {[timeCounterKey] : timeMS} ;
            }
        }

        let useEndDate = endDatePicked ? endDate.getTime() : new Date(Date.now() + 315360000000).getTime();

        let newHabit: Habit = {
            title,
            description,
            timesToComplete: times,
            endDate: useEndDate,
        };
    
        createHabit(newHabit);
    
        setTitle('');
        setDescription('');
        setDaysSet({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        });
    
        setTimesToComplete('');
        setAfternoon('');
        console.log('Habit created:', newHabit);
    };

    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.texboxWithLabel}>
                    <Text style={styles.label}>
                        Title:
                    </Text>
                    
                    <TextInput style={styles.input}
                        editable 
                        onChangeText={text => setTitle(text)} 
                        value={title} placeholder="" 
                        autoCapitalize="none"
                        numberOfLines={1}
                    />
                </View>
                <View style={styles.texboxWithLabel}>
                    <Text style={styles.label}>
                        Description:
                    </Text>
                    <TextInput style={styles.input}
                        editable 
                        onChangeText={text => setDescription(text)} 
                        value={description} placeholder="" 
                        autoCapitalize="none"
                        numberOfLines={3}
                    />
                </View>
                
                <View>
                    <Text style={styles.label}>
                            Days:
                    </Text>
                    <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginTop: 5}}>
                        {days?.map((item, index) => (
                                <Pressable 
                                    key = {index}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: daysSet[dayKeys[index]] ? '#8DB1F7' : '#ccc' }} onPress={() => toggleDay(index)}>
                                <Text style={{ color: 'white' }}>{item}</Text>
                                </Pressable>    
                            ))}
                    </View>
                </View>

                <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginTop: 20}}>
                <Text style={styles.label}>
                            Time:
                    </Text>
                    <TextInput
                        style={styles.timeInput}
                        onChangeText={handleTimeInput}
                        value={timesToComplete}
                        maxLength={5}
                    />
                    <Pressable 
                        style={{ 
                            width: 40,
                            height: 40,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: afternoon === 'AM' ? '#8DB1F7' : '#ccc' }}
                        onPress={() => setAfternoon('AM')}>
                        <Text style={{ color: 'white' }}>AM</Text>
                    </Pressable>
                    <Pressable 
                        style={{ 
                            width: 40,
                            height: 40,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center', 
                            backgroundColor: afternoon === 'PM' ? '#8DB1F7' : '#ccc' }}
                        onPress={() => setAfternoon('PM')}>
                        <Text style={{ color: 'white' }}>PM</Text>
                    </Pressable>
                </View>

                <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginTop: 5}}>
                {endDatePicked ? <Text> {endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text> : null}
                {show && (
                    <DateTimePicker
                        testID="datePicker"
                        value={endDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
                <GeneralButtonDark buttonText={"End Date?"} onPress={showDatepicker} textStyle={styles.small} containerStyle={{width: 100, height: 40 , marginTop: "4%"}}/>
                </View>
                <GeneralButtonDark buttonText={"Create"} onPress={handleCreateHabit} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: 20, marginBottom: 100}}/>

            </View>
        </ScrollView>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )       
}

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center'
    },
    texboxWithLabel: {
        width: '80%',
        height: 100,
        marginBottom: -10
    },
    label:{
        color: '#050B24',
        marginBottom: 2,
        textAlign: 'left'
    },
    input: {
        width: "100%", 
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '50%'
    },
    timeInput: {
        width: "15%", 
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        //padding: '3%',
        height: '100%',
        textAlign: 'center'
    },
    timeTextBoxWithLabel: {
        width: '55%',
        height: 100,
        marginBottom: -10
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    small: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
    dateText: {
        fontSize: 18,
        marginTop: 10,
    },
    overlord: {
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40: 0,
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1
    }
});