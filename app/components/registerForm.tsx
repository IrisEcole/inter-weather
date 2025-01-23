import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";


export const RegisterForm = () => {
        const [userName, setUserName] = React.useState('');
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [showPassword, setShowPassword] = React.useState(false);

        const register = async () => {
                setLoading(true);
                try {
                        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then(async (userCredential) => {
                                const userCred = userCredential.user;
                                await updateProfile(userCred, {
                                        displayName: userName,
                                });
                                console.log(userName);
                        })
                        console.log(response);
                } catch (error: any) {
                        console.error(error);
                        alert("Registration Failed" + error.message)
                } finally {
                        setLoading(false);
                }
        };

        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

        return (
                <View>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 18 }} > Name </Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={setUserName}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 18 }} > Email </Text>
                        <TextInput
                                style={styles.input}
                                keyboardType="email-address"
                                onChangeText={setEmail}
                        />

                        <View style={styles.passwordContainer}>
                                <Text style={{ fontSize: 18 }}> Password </Text>
                                <MaterialCommunityIcons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="#aaa"
                                        onPress={toggleShowPassword}
                                />
                        </View>
                        <TextInput
                                secureTextEntry={!showPassword}

                                style={styles.input}
                                onChangeText={setPassword}
                        />

                        {loading ? (<ActivityIndicator> </ActivityIndicator>) : (<>
                                <TouchableOpacity style={styles.button} onPress={register} >
                                        <Text>Register</Text>
                                </TouchableOpacity>
                        </>
                        )}
                </View>
        )
}

const styles = StyleSheet.create({
        input: {
                borderWidth: 1,
                borderColor: '#235789',
                borderRadius: 20,
                padding: 10,
                marginBottom: 20,
                marginTop: 10,
                width: 300,
                textAlign: 'left',
                outlineColor: "#235789",
        }, button: {
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
                borderRadius: 20,
                width: 90,
        },
        passwordContainer: {
                flexDirection: 'row',
                alignSelf: 'stretch',
        },
});

export default RegisterForm;