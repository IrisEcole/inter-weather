import { Link, Redirect } from 'expo-router';
import { onAuthStateChanged, User } from "firebase/auth";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { RegisterForm } from '../components/registerForm';



export default function Sign_up() {

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
        
        return (
                <View style={styles.main}>
                        <View style={styles.center}>

                                <Text style={{ paddingBottom: 30, fontSize: 24, flexWrap: 'nowrap' }}> Join InterWeather</Text>
                                <RegisterForm></RegisterForm>
                                <View style={{
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        paddingTop: 20
                                }}>
                                        <Text style={{ fontSize: 18 }}> Already have an account ? </Text>
                                        <Link style={{ fontSize: 18, color: 'blue' }} href="/login">login</Link>
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