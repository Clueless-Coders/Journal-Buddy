import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, FlatList } from 'react-native';
import Menu from '../HamburgerMenu/Menu';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';

export default function JournalEntries() {
    return (
        <SafeAreaView style={styles.overlord}>
            <View style={{zIndex: 1}}>
                <Menu />
            </View>
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Journal Entries
                </Text>
                
            </View>
            <View style={styles.mainContent}>
                <TextInput placeholder='Search' style={styles.inputBox}/>
                <FlatList data={DATA} renderItem={
                    ({item}) => 
                        <GeneralButtonLight 
                            onPress={() => console.log(item.toJSON())} 
                            buttonText={item.toDateString()} 
                            containerStyle={styles.containerStyle}
                        />
                }/>
            </View>
            
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
        margin: 5
    },
    containerStyle: {
        width: 315
    }
});