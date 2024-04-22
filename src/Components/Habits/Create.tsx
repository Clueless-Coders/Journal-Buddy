import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import GeneralButtonDark from '../Buttons/GeneralButtonDark';

export default function HabitPage({navigation}: any) {
    let [title, setTitle] = React.useState('');
    let [description, setDescription] = React.useState('');    
    let [daysSet, setDaysSet] = React.useState('');

    

    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];

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
                                    backgroundColor: '#8DB1F7',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                            <Text style={{ color: 'white' }}>{item}</Text>
                            </Pressable>    
                        ))}
                    </View>
                </View>

                <View>
                    
                </View>
                <GeneralButtonDark buttonText={"Log In"} onPress={handleLogin} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: "7%"}}/>

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
        backgroundColor: 'gray',
        marginBottom: '2%'
    },
    header: {
        marginTop: '1%',
        marginBottom: '1%',
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
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});