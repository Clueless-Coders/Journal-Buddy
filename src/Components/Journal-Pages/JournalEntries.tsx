import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import Menu from '../HamburgerMenu/Menu';
import BackButton from '../Buttons/BackButton';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';

export default function JournalEntries() {
    return (
        <SafeAreaView style={styles.overlord}>
            <BackButton onPress={() => console.log('hello!')} buttonText='Hello!' />
            <GeneralButtonDark onPress={() => console.log('hello!')} buttonText='Hello!' containerStyle={{height: 300, width: 500}} textStyle={{fontSize: 30, color: 'orange'}}/>
            <GeneralButtonLight onPress={() => console.log('hello!')} buttonText='Hello!' containerStyle={{height: 20, width: 20}} textStyle={{fontSize: 12, color: 'red'}}/>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});