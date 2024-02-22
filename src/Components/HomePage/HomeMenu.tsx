import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, Button, Alert } from 'react-native';
// import GeneralButton from '../Components/GeneralButton';

export default function HomeMenu() {
    //TODO: Add functions to do their respective tasks once they are implemented
    //TODO: Interface with the backend in order to save the user's response.
    let [input, onChangeInput] = React.useState('');
    return (
        <SafeAreaView style={styles.overlord}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.top}>
                    {/* insert button here */}
                    <Text style={styles.header}>
                        {"Home"}
                        </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header2}>
                            Hi, John! 
                    </Text>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header2}>
                            Daily Quote:
                        </Text>
                        <Text style={styles.prompt}>
                            ":3" - T
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.header2}>
                            Today's Task
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {new Date().toDateString()}
                        </Text>
                    </View>
                    
                    <View style = {styles.buttonBox}>
                        {/* <GeneralButton buttonText={"Start Today's Entry"} onPress={() => null}/> */}

                    </View>
                    <View style = {styles.habitBox}>
                        {/* <GeneralButton buttonText={"Habit 1"} onPress={() => null}/> */}
                        {/* <GeneralButton buttonText={"Habit 2"} onPress={() => null}/> */}
                        {/* <GeneralButton buttonText={"Habit 3"} onPress={() => null}/> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        zIndex: 0,
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: 'black',
    },
    headerWrapper: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#f2f9ff',
        flex:1
    },
    header2: {
        fontSize: 20,
    },
    prompt: {
        fontSize: 15,
        color: 'black',
        padding: 10,
        
    },
    backButton: {
        fontSize: 20,
        color: '#23395b',
        flex: 1
    },
    top: {
        fontSize: 30,
        // flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    buttonBox:{
        // backgroundColor:'black',
        width:'100%',
        alignItems:'center'
    },
    Button: {
            height: 50,
            width: '90%',
            borderWidth: 1,
            margin: 10,
            borderRadius: 12,
    },
    textStyleDefault: {
            fontSize: 15,
            textAlign: 'center'
    },
    habitBox:{
        // backgroundColor:'blue',
        borderWidth:1,
        borderRadius: 12,
        width:'90%',
        alignItems:'center'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
}
)