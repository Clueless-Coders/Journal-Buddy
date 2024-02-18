import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import PromptButton from './PromptButton';

export default function DailyPrompt() {
    //TODO: Match the styling of this page to the Canva
    // Maybe? Dynamically retrieve the daily quote from ChatGPT
    let [input, onChangeInput] = React.useState('');
    return (
        <ScrollView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>
                        Daily Prompt:
                    </Text>
                </View>
                
                <Text style={styles.prompt}>
                    Recall a moment from your past that still lingers in your memory. 
                    Explore the details of that moment, the emotions it evoked, and the lessons you may have learned. 
                    How does that memory shape your present perspectives or decisions?
                    Reflect on the impact it had on your personal growth and the person you've become today.
                </Text>
                <PromptButton buttonText={"Save Response"}></PromptButton>
            </View>
            <TextInput editable multiline onChangeText={text => onChangeInput(text)} value={input} placeholder="Enter your response here." style={styles.inputField} numberOfLines={20}/>
        </ScrollView>
        
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
            fontWeight: 'bold',
            color: 'black',
        },
        headerWrapper: {
            borderBottomWidth: 2,
            marginBottom: 10
        },
        prompt: {
            fontSize: 15,
            color: 'black',
            padding: 10,
            backgroundColor: '#f2f9ff'
        },
        inputField: {
            textAlign: 'left',
            borderWidth: 1,
            flex: 1
        }
    }
)