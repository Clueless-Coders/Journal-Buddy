import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { createHabit, Habit } from '../../firebase/Database';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

export default function HabitPage({navigation}: any) {
    let [title, setTitle] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [daysSet, setDaysSet] = React.useState({
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    });

    let [timesToComplete, setTimesToComplete] = React.useState('12:00');
    let [endDate, setEndDate] = React.useState(new Date());
    let [isPickerShow, setIsPickerShow] = React.useState(false);
    let [mode, setMode] = React.useState('date');

    //how to fetch the users stuff and save this to their account ask tristan

    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const toggleDay = (index) => {
        const day = dayKeys[index];
        setDaysSet(prev => ({ ...prev, [day]: !prev[day] }));
    };

    const showPicker = (pickerMode) => {
        setIsPickerShow(true);
        setMode(pickerMode);
    };

    const onChange = (event, selectedValue) => {
        setIsPickerShow(Platform.OS === 'ios');
        if (mode === 'time') {
            const selectedTime = selectedValue || timesToComplete;
            setTimesToComplete(selectedTime);
        } else {
            const selectedDate = selectedValue || endDate;
            setEndDate(selectedDate);
        }
    };

    function handleCreateHabit() {
        const newHabit: Habit = {
            daysToComplete: daysSet,
            title: title,
            description: description,
            timesToComplete: { time: timesToComplete.getTime() },
            endDate: endDate.getTime(),
            uid: '', 
            user: '',
        };

        createHabit(newHabit);

        setTitle('');
        setDescription('');
        setDaysSet({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });
        console.log('Habit created:', { title, description, endDate, timesToComplete });
    };

    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Create a Habit
                </Text>
                <View style={styles.div} />
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
                    <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginTop: 10}}>
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

                <View>
                <GeneralButtonDark buttonText="Set Time" onPress={() => showPicker('time')} />
                            <GeneralButtonDark buttonText="Set End Date" onPress={() => showPicker('date')} />
                            {isPickerShow && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={mode === 'time' ? timesToComplete : endDate}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}    
                </View>
                {/* //non operational / old
                <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginTop: 10}}>
                    <View style={styles.timeTextBoxWithLabel}>
                        <Text style={styles.label}>
                            Time:
                        </Text>
                        <TextInput style={styles.timeInput}
                            editable 
                            onChangeText={text => setAfternoon(text)} 
                            // value={after} placeholder="" 
                            autoCapitalize="none"
                            numberOfLines={3}
                        />
                    </View>
                        {afternoon?.map((item, index) => (
                            <Pressable 
                                key = {index}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: after[afternoonKeys[index]] ? '#8DB1F7' : '#ccc' }} onPress={() => toggleTime(index)}>
                            <Text style={{ color: 'white' }}>{item}</Text>
                            </Pressable>    
                        ))}
                </View> */}

                <View style={styles.div} />
                <GeneralButtonDark buttonText={"Create"} onPress={handleCreateHabit} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: "1%"}}/>

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
    div: {
        width: "90%",
        height: 1,
        backgroundColor: '#E7EFFF70',
        marginBottom: '5%',
        marginTop: '5%'
    },
    header: {
        marginTop: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#050B24',
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
        width: "100%", 
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '50%'
    },
    timeTextBoxWithLabel: {
        width: '55%',
        height: 100,
        marginBottom: -10
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});