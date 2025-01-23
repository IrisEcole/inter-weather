import { Redirect } from "expo-router";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { DeleteAccountForm } from "../components/DeleteAccountForm";


export default function Account() {
        const [user, setUser] = React.useState<User | null>(null);
        const [loading, setLoading] = React.useState(false);
        const [userName, setUserName] = React.useState('');

        //User persistence 
        React.useEffect(() => {
                onAuthStateChanged(FIREBASE_AUTH, (user) => {
                        setUser(user);
                        if (!user) {
                        }
                });
        }, []);
        if (!user) {
                return <Redirect href="/" />;
        }

        const updateUserName = async () => {
                setLoading(true);
                try {
                        await updateProfile(user, {
                                displayName: userName,
                        });
                        console.log(userName);
                } catch (error: any) {
                        console.error(error);
                        alert("Registration Failed" + error.message)
                } finally {
                        setLoading(false);
                        setUserName('');
                }
        };
        return (
                <View style={styles.main}>
                        <View style={styles.center}>
                                <Text style={{ paddingBottom: 20, fontSize: 24, flexWrap: 'nowrap' }}> Your Account </Text>
                                <Text style={{ paddingBottom: 10, fontSize: 16, alignSelf: 'flex-start' }}> Your Username: </Text>
                                <TextInput
                                        style={styles.input}
                                        keyboardType="email-address"
                                        onChangeText={setUserName}
                                        placeholder={user?.displayName !== null ? (user?.displayName) : ""}
                                        value={userName}
                                        placeholderTextColor={'grey'}
                                />
                                {loading ? (<ActivityIndicator> </ActivityIndicator>) : (<>
                                        <TouchableOpacity style={styles.buttonUpdate} onPress={updateUserName} >
                                                <Text>Save Changes</Text>
                                        </TouchableOpacity>
                                </>
                                )}
                                <DeleteAccountForm></DeleteAccountForm>
                                <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()} >
                                        <Text>Sign Out</Text>
                                </TouchableOpacity>
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
                width: 200,
                textAlign: 'left',
                outlineColor: "#235789",
                alignSelf: 'flex-start'
        },
        button: {
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
                borderRadius: 20,
                alignSelf: 'flex-start',
                marginBottom: 20
        },
        buttonUpdate: {
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
                borderRadius: 20,
                width: 200,
                marginBottom: 20,
                fontSize: 16
        },
});