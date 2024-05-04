import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import BackButton from '../Buttons/BackButton';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { createJournal, getJournalByID, Journal, updateJournal } from '../../firebase/Database';
import { getAuth } from 'firebase/auth';

export type PromptPageProps = {
    journal?: Journal,
    prompt?: string
}
export default function DailyPrompt({ navigation, route }: any) {
    let [response, setResponse] = React.useState('');
    let [prompt, setPrompt ] = React.useState('');
    let [journal, setJournal] = React.useState({} as Journal);
    
    function handleSubmit() {
        const auth = getAuth();
        if(auth.currentUser === undefined || auth.currentUser === null)
            return;

        console.log("Checking if we should edit or create...");
        console.log(journal);
        if(route.params !== undefined && new Date().getUTCDate() === new Date(journal.dayWritten).getUTCDate()){
            console.log("Editing instead of creating");
            console.log(route.params.journalID);
            updateJournal(route.params.journalID, journal);
        } else {
            console.log("New journal detected! Creating a new journal entry in the DB");
            const newJournal: Journal = {
                user: auth.currentUser.uid,
                entry: journal.entry,
                uid: "unknown",
                dayWritten: Date.now()
            };
            createJournal(newJournal).then(() => {
                route.params = undefined;
                setResponse("");
            });
        }
        navigation.navigate('JournalEntries');
    }

    React.useEffect(() => {
        async function getJournal(journalID: string){
            let journal = await getJournalByID(journalID);
            setJournal(journal);
        }
        if(route.params?.journalID) {
            getJournal(route.params.journalID);
        }
        
        console.log('In DailyPrompt: ');
        console.log(route.params);
    }, [route.params])
    
    return (
        <SafeAreaView style={styles.overlord}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>
                            Daily Prompt:
                        </Text>
                        <Text style={styles.prompt}>
                            {prompt !== undefined || prompt !== null ? 
                            <Text>
                                Recall a moment from your past that still lingers in your memory. 
                                Explore the details of that moment, the emotions it evoked, and the lessons you may have learned. 
                                How does that memory shape your present perspectives or decisions?
                                Reflect on the impact it had on your personal growth and the person you've become today.
                            </Text> : 
                            <Text> 
                                {prompt} 
                            </Text> }
                        </Text>
                    </View>
                    <GeneralButtonDark buttonText={"Save Response"} onPress={() => handleSubmit()} containerStyle={styles.submit}/>
                </View>
                <TextInput 
                    editable 
                    multiline 
                    onChangeText={text => setJournal({...journal, entry: text})} 
                    value={journal.entry} placeholder="Enter your response here." 
                    style={styles.inputField} 
                    numberOfLines={20}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            fontFamily: "Inter_400Regular"
        },
        submit: {
            width: '70%',
            margin: 10
        },
        container: {
            flex: 1,
            zIndex: 0,
            alignItems: 'center'
        },
        header: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
        },
        headerWrapper: {
            alignItems: 'center',
            backgroundColor: '#f2f9ff'
        },
        prompt: {
            fontSize: 15,
            color: 'black',
            padding: 10,
            
        },
        inputField: {
            marginLeft: 5,
            marginRight: 5,
            textAlign: 'left',
            borderWidth: 1,
            padding: 10,
            height: '100%'
        },
        backButton: {
            fontSize: 20,
            color: '#23395b',
            flexWrap: 'nowrap'
        },
        date: {
            fontSize: 20,
            alignSelf: 'flex-end'
        },
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5
        },
        overlord: {
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            backgroundColor: 'white',
            flex: 1
        }
    }
)