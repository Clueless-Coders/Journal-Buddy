import React from 'react';
import { Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, ScrollView } from 'react-native';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { Journal, getJournalsByCurrentUser } from '../../firebase/Database';
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth';

export default function JournalEntries({ navigation, route }: any) {
    let [ data, setData ] = React.useState([] as Journal[]);

    React.useEffect(() => {
        async function getJournals(){
            const journals = await getJournalsByCurrentUser();
            setData(journals);
        }
        
        onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/journals`), async (data) =>{
            getJournals();
        })
    }, []);

    React.useEffect(() => {
        async function getJournals(){
            let journals = await getJournalsByCurrentUser();
            setData(journals);
        }

        if(route.params !== undefined && route.params.update) {
            getJournals();
        }
    }, [route.params])
    
    return (
        <SafeAreaView style={styles.overlord}>  
            <TextInput placeholder='Search' style={styles.inputBox}/>
            <ScrollView contentContainerStyle = {styles.mainContent}>
                <GeneralButtonDark  onPress={() => navigation.navigate('NewJournal')} buttonText={'Start today\'s journal!'} containerStyle={styles.containerStyle} />
                { data.length > 0 ? data.reverse().map((item, index) => {
                    return <GeneralButtonLight  
                        key={index} 
                        onPress={() => { navigation.navigate('NewJournal', { journalID: item.uid })}} 
                        buttonText={new Date(item.dayWritten).toDateString()} 
                        containerStyle={styles.containerStyle}
                    />;
                }) : <Text>Create a journal to see your previous responses!</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
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