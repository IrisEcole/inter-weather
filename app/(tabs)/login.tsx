import { Link, Redirect } from 'expo-router';
import { onAuthStateChanged, User } from "firebase/auth";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { Loginform } from '../components/loginForm';



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
                                <Loginform></Loginform>
                                <View style={{
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        paddingTop: 20
                                }}>
                                        <Text style={{ fontSize: 18 }}> Don't have an account ? </Text>
                                        <Link style={{ fontSize: 18, color: 'blue' }} href="/register">register</Link>
                                </View>
                                <View style={{ paddingBottom: 10 }}></View>
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