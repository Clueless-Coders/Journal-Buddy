import React from 'react';
import { Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, ScrollView } from 'react-native';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { Journal, getJournalsByCurrentUser } from '../../firebase/Database';
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth';

export default function JournalEntries({ navigation }: any) {
    let [ data, setData ] = React.useState([] as Journal[]);

    React.useEffect(() => {
        async function getJournals(){
            const journals = await getJournalsByCurrentUser();
            journals.sort((journalA, journalB) => {
                return journalA.dayWritten - journalB.dayWritten;
            })
            setData(journals);
            console.log(journals);
        }
        
        onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/journals`), async () =>{
            getJournals();
        })
    }, []);
    
    return (
        <SafeAreaView style={styles.overlord}>  
            <ScrollView contentContainerStyle = {styles.mainContent}>
                { (data.length > 0 && new Date(data[data.length - 1].dayWritten).toDateString() === new Date().toDateString()) ?  
                    null :
                    <GeneralButtonDark  
                        onPress={() => navigation.navigate('Journal')} 
                        buttonText={'Start today\'s journal!'} 
                        containerStyle={styles.containerStyle}
                        textStyle={{ color: '050B24' }}
                    /> 
                }
                { data.length > 0 ? data.reverse().map((item, index) => {
                    return <GeneralButtonLight  
                        key={index} 
                        onPress={() => { navigation.navigate('Journal', { journalID: item.uid })}} 
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
    containerStyle: {
        width: '90%',
        margin: 5
    }
});