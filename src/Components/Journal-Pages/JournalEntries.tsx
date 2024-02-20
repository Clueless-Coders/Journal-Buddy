import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import Menu from '../HamburgerMenu/Menu';

export default function JournalEntries() {
    return (
        <SafeAreaView style={styles.overlord}>
            <View style={{zIndex: 1}}>
                <Menu />
            </View>
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