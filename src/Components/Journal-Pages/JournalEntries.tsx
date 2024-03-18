import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, FlatList, ScrollView } from 'react-native';
import Menu from '../HamburgerMenu/Menu';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';

export default function JournalEntries() {
    
    return (
        <SafeAreaView style={styles.overlord}>  
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Journal Entries
                </Text>
            </View>
            <TextInput placeholder='Search' style={styles.inputBox}/>
            <ScrollView contentContainerStyle = {styles.mainContent}>
                <GeneralButtonDark  onPress={() => console.log('hello')} buttonText={'Start today\'s journal!'} containerStyle={styles.containerStyle} />
                { DATA.map((item) => {
                    return <GeneralButtonLight  onPress={() => console.log('hello')} buttonText={item.toDateString()} containerStyle={styles.containerStyle}/>;
                }) }
            </ScrollView>
            
        </SafeAreaView>
        
    );
}

const DATA = [new Date(), new Date(), new Date(), new Date()];

const styles = StyleSheet.create({
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
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
        alignItems: 'center',
        flex: 1
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