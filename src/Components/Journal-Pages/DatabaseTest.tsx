import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import {child, getDatabase, push, ref, set, update} from "firebase/database"
import { Button } from 'react-native';
import {db} from "../Database/Database";



//a test page for interacting with the Firebase database
//It should log users/emails into Firebase ->
export default function DatabaseTest() {

    const [username, setName] = useState('');
    const [email, setEmail] = useState('');



    function create() { 
            const newKey = push(child(ref(db), "users")).key;
            set(ref(db, 'users/' + username), {
              username: username,
              email: email,
            }).then(() => {
                Alert("data submitted!");
            }).catch((error => {
                Alert(error);
            }));
    }
    
    return (
        <View style ={styles.container}>
         <Text>cruding everywhere with this one!</Text>
         <TextInput value = {username} onChangeText = { (username) => setName(username)}placeholder ="Username" style ={styles.textBoxes}></TextInput>
         <TextInput value = {email} onChangeText = { (email) => setEmail(email)}placeholder ="Email" style = {styles.textBoxes}></TextInput>
            <Button onClick = {create} title='Epic.'/> 
        </View>
        
    );
}
const styles = StyleSheet.create({
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
    },
    container: {
        flex: 1, 
        backgroundColor : "#fff",
        alignItems : "center",
        justifyContent: "center",
        borderColor: 'grey'
    },
    textBoxes: {
        width: "90%",
        fontSize: 18,
        padding: 12,
        borderColor: "gray",
        borderWidth: 0.2,
        borderRadius: 10
    }
});