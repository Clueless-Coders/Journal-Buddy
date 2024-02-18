import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, ViewStyle } from 'react-native'

export default function DailyPrompt() {
    //TODO: Match the styling of this page to the Canva
    // Maybe? Dynamically retrieve the daily quote from ChatGPT
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Your journal prompt for the day:
            </Text>
            <Text style={styles.prompt}>
                Recall a moment from your past that still lingers in your memory. 
                Explore the details of that moment, the emotions it evoked, and the lessons you may have learned. 
                How does that memory shape your present perspectives or decisions?
                Reflect on the impact it had on your personal growth and the person you've become today.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
        wrapper: {
            flex: 1
        },
        container: {
            flex: 1,
            zIndex: 0
        },
        header: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#dcdede'
        },
        prompt: {
            fontSize: 15,
            color: '#dcdede'
        }
    }
)