import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { AuthContext } from '../../AuthContext';

export default function SignUp(){
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let auth = useContext(AuthContext);


    function handleLogin() {
        auth.login();
    }

    return(
        <KeyboardAvoidingView>
            <ScrollView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <SafeAreaView style={styles.overlord}>
                        <View>
                            <Text style={styles.header}>
                                Sign Up            
                            </Text>
                        </View>
                        <View style={styles.texboxWithLabel}>
                            <Text style={styles.prompt}>
                                Email:
                            </Text>
                            <TextInput
                                editable 
                                onChangeText={text => setEmail(text)} 
                                value={email} placeholder="" 
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
                                onChangeText={text => setPassword(text)} 
                                value={password} placeholder=""
                                autoCapitalize="none"
                                secureTextEntry
                                style={styles.inputField} 
                                numberOfLines={1}
                            />
                        </View>
                        <View style={styles.texboxWithLabel}>
                            <Text style={styles.prompt}>
                                Confirm Password:
                            </Text>
                            <TextInput  
                                editable 
                                onChangeText={text => setPassword(text)} 
                                value={password} placeholder=""
                                autoCapitalize="none"
                                secureTextEntry
                                style={styles.inputField} 
                                numberOfLines={1}
                            />
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )       
}

const styles = StyleSheet.create({
    overlord: {
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    header: {
        marginTop: '70%',
        marginBottom: '5%',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#050B24'
    },
    prompt: {
        color: '#050B24',
        marginBottom: 2,
    },
    texboxWithLabel: {
        width: '78%',
        height: 100
    },
    inputField: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 150,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '50%'
    }
});