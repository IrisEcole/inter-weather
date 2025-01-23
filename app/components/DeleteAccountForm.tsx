import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, User } from "firebase/auth";
import React from "react";
import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";


export const DeleteAccountForm = () => {
        const [loading, setLoading] = React.useState(false);
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [showPassword, setShowPassword] = React.useState(false);
        const [deleteUserModalVisible, setDeleteUserModalVisible] = React.useState(false);
        const [user, setUser] = React.useState<User | null>(null);

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

        const closeDeleteForm = () => {
                setEmail('');
                setPassword('');
                setDeleteUserModalVisible(false);
                setShowPassword(false)
        }

        const HandleDeleteUser = async () => {
                setLoading(true);
                try {
                        const credential = await EmailAuthProvider.credential(
                                email,
                                password
                        );
                        await reauthenticateWithCredential(user, credential)
                        await deleteUser(user)
                        setEmail('');
                        setPassword('');
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
                <View style={{ alignSelf: 'flex-start' }}>
                        <TouchableOpacity style={styles.button} onPress={() => setDeleteUserModalVisible(true)} >
                                <Text>Delete Your Account</Text>
                        </TouchableOpacity>
                        <Modal
                                animationType="slide"
                                transparent={true}
                                visible={deleteUserModalVisible}
                                onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                        setDeleteUserModalVisible(!deleteUserModalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                                <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 22 }}>Please confirm email and password</Text>
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
                                                        <TouchableOpacity style={styles.button} onPress={() => HandleDeleteUser()} >
                                                                <Text>Delete your account</Text>
                                                        </TouchableOpacity>
                                                </>
                                                )}
                                                <Pressable
                                                        style={[{ backgroundColor: 'white' }, { backgroundColor: 'white' }]}
                                                        onPress={() => closeDeleteForm()}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>Close</Text>
                                                </Pressable>


                                        </View>
                                </View>
                        </Modal>
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
        passwordContainer: {
                flexDirection: 'row',
                alignSelf: 'stretch',
        },
        centeredView: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
        },
        modalView: {
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                        width: 0,
                        height: 2,
                },
        }
});