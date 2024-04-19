import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, FlatList, ScrollView } from 'react-native';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { Journal, getJournalsByCurrentUser, getJournalsByUserID } from '../../firebase/Database';
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth';

export default function JournalEntries() {
    
    let [ data, setData ] = React.useState([] as Journal[])

    React.useEffect(() => {
        let ignore = false;

        async function getJournals(){
            getJournalsByCurrentUser().then((journals) => {
                console.log(journals);
                if(!ignore){
                    setData(journals);
                }
            });
            
        }
        onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/journals`), (data) =>{
            getJournals();
        })
        return () => {ignore = true};
    }, []);
    
    return (
        <SafeAreaView style={styles.overlord}>  
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Journal Entries
                </Text>
            </View>
            <TextInput placeholder='Search' style={styles.inputBox}/>
            <ScrollView contentContainerStyle = {styles.mainContent}>
                <GeneralButtonDark  onPress={() => console.log(data)} buttonText={'Start today\'s journal!'} containerStyle={styles.containerStyle} />
                { data.length > 0 ? data.map((item, index) => {
                    return <GeneralButtonLight  key={index} onPress={() => console.log('hello')} buttonText={item.dayWritten} containerStyle={styles.containerStyle}/>;
                }) : <Text>bad</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
        fontFamily: "Inter_400Regular"
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        borderBottomWidth: 2,
        borderColor: 'grey'
    },
    headerText: {
        fontSize: 35,
        padding: 5
    },
    mainContent: {
        alignItems: 'center'
    },
    inputBox: {
        borderWidth: .5,
        width: '80%',
        backgroundColor: '#f2f9ff',
        padding: 5,
        borderRadius: 25,
        margin: 5,
        alignSelf: "center"
    },
    containerStyle: {
        width: '90%',
        margin: 5
    }
});