import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, onValue, ref } from 'firebase/database'
import { Habit, getHabitsByCurrentUser } from '../../firebase/Database';
import { getAuth } from 'firebase/auth';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';

export default function HabitPage({navigation}: any) {
    let [ data, setData ] = React.useState([] as Habit[]);

    React.useEffect(() => {
        async function getHabits(){
            const habits = await getHabitsByCurrentUser();
            setData(habits);
            console.log(habits);
        }
        
        onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/habits`), async () =>{
            getHabits();
        })
    }, []);

    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
            
            { data.length > 0 ? data.reverse().map((item, index) => {
                    return <GeneralButtonLight  
                        key={index} 
                        onPress={() => { null }} 
                        buttonText={item.title} 
                        containerStyle={styles.containerStyle}
                        textStyle={{ color: '050B24' }}
                    />;
                }) : <Text>You can view all your habits here!</Text>}

            <View style={styles.top}>
            <Pressable
                style={({ pressed }) => [
                    styles.plus,
                    {opacity: pressed ? 0.5 : 1 } 
                ]}
                onPress={() => navigation.navigate("Create Habit")}>
                <Ionicons name="add" size={15} color="white" />
            </Pressable>
            </View>
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
    containerStyle: {
        width: '90%',
        margin: 5
    },
    top: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 25
    },
    press: {
        backgroundColor: "#8DB1F7",
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    plus: {
        backgroundColor: "#8DB1F7",
        borderRadius: 20,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        alignItems: 'center',
        fontSize: 13,
        color: 'white'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});