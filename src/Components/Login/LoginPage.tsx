import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { AuthContext } from '../../AuthContext';


export default function LoginPage() {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    


    function handleLogin() {
        let auth = useContext(AuthContext);
        auth.login();
    }

    return (
        <SafeAreaView style={styles.overlord}>
        <View style={styles.top}>
                <Text style={styles.header}>
                    Welcome!
                </Text>
        </View>
            <View style={styles.container}> 
                <View style={styles.texboxWithLabel}>
                    <Text style={styles.prompt}>
                        Username:
                    </Text>
                    <TextInput 
                        editable 
                        multiline 
                        onChangeText={text => setUsername(text)} 
                        value={username} placeholder="" 
                        autoCapitalize="none"
                        style={styles.inputField} 
                        numberOfLines={1}
                    />
                </View>
                <View style={styles.texboxWithLabel}>
                    <Text style={styles.prompt}>
                        Password:
                    </Text>
                    <TextInput 
                        editable 
                        multiline 
                        onChangeText={text => setPassword(text)} 
                        value={password} placeholder=""
                        autoCapitalize="none"
                        style={styles.inputField} 
                        numberOfLines={1}
                    />
                </View>
                <GeneralButtonDark buttonText={"Log In"} onPress={handleLogin} textStyle={styles.textStyle} containerStyle={{width: '78%', marginTop: 25}}/>

                <Text style={styles.thin}>
                        Don't have an account? Sign Up!
                    </Text>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create( {
    top: {
        alignItems: 'center'
    },
    container: {
        alignItems: 'center'
    },
    header: {
        marginTop: '80%',
        marginBottom: '5%',
        fontSize: 55,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    prompt: {
        color: '#050B24',
        marginBottom: 5,
        textAlign: 'left' //how to align prompts to the left of the boxes, not screen?? use views!!
    },
    inputField: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: 10
    },
    thin: {
        alignItems: 'center',
        fontWeight: '100',
        color: '#050B24'
    },
    texboxWithLabel: {
        width: '78%',
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});