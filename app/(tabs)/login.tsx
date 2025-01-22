import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Redirect } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
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
        if (user) {
                return <Redirect href="/" />;
        }

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
                                        <TouchableOpacity style={styles.button} onPress={signIn} >
                                                        <Text>Log in</Text>
                                                </TouchableOpacity>

                                </>
                                )}
                                <View style={{
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        paddingTop: 20
                                }}>
                                </View>
                                              <View style={{
                                                                        backgroundColor: 'transparent',
                                                                        flexDirection: 'row',
                                                                        flexWrap: 'wrap',
                                                                        paddingTop: 20
                                                                }}>
                                                                        <Text style={{ fontSize: 18 }}> Don't have an account ? </Text>
                                                                        <Link style={{ fontSize: 18, color: 'blue' }} href="/register">register</Link>
                                                                </View>
                                <View style={{ paddingBottom: 100 }}></View>
                        </View>
                </View>

        );
}

const styles = StyleSheet.create({
        main: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
        },
        center: {
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