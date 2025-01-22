import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";


export default function Sign_up() {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [showPassword, setShowPassword] = React.useState(false);


        const [user, setUser] = React.useState<User | null>(null);

        //User persistence 
        React.useEffect(() => {
                onAuthStateChanged(FIREBASE_AUTH, (user) => {
                        setUser(user);
                });
        }, []);
        if (!user) {
                return <Redirect href="/" />;
        }
        const register = async () => {
                setLoading(true);

                try {
                        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
                        console.log(response);
                        return;
                } catch (error: any) {
                        console.error(error);
                        alert("Registration Failed" + error.message)
                } finally {
                        setLoading(false);
                }
        };

        const signIn = async () => {
                setLoading(true);
                try {
                        const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
                        console.log(response);
                        return;
                } catch (error: any) {
                        console.error(error);
                        alert("Log in Failed" + error.message)
                } finally {
                        setLoading(false);
                }
        };

        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

        return (
                <View style={styles.main}>
                        <View style={styles.center}>

                                <Text style={{ paddingBottom: 40, fontSize: 24 }}> Join InterWeather</Text>
                                <Text style={{ alignSelf: 'flex-start', fontSize: 18 }} > Email </Text>
                                <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
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
                                        keyboardType="numeric"
                                        onChangeText={setPassword}
                                />

                                {loading ? (<ActivityIndicator> </ActivityIndicator>) : (<>
                                        <View style={{
                                                backgroundColor: 'transparent',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                paddingTop: 20,
                                                columnGap: 40
                                        }}>

                                                <TouchableOpacity style={styles.button} onPress={register} >
                                                        <Text>Register</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.button} onPress={signIn} >
                                                        <Text>Log in</Text>
                                                </TouchableOpacity>
                                        </View>
                                </>

                                )}

                                <View style={{
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        paddingTop: 20
                                }}>
                                </View>
                                <View style={{ paddingBottom: 100 }}></View>
                        </View>



                </View>

        );
}

const styles = StyleSheet.create({
        background: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '100%',
        },
        main: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
        },
        center: {
                width: '25%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
        },
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
        }, ggestionItem: {
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                width: 200,
                alignSelf: 'center',
        },
        selectedCity: {
                marginTop: 20,
                fontSize: 26,
                fontWeight: 'bold',
        },
        weatherIcon: {
                width: 60,
                height: 60,
        },
        button: {
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