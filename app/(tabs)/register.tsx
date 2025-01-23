import { Link, Redirect } from 'expo-router';
import { onAuthStateChanged, User } from "firebase/auth";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { RegisterForm } from '../components/registerForm';

export default function Register() {
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
});