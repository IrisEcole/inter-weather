import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateProfile, User } from "firebase/auth";
import React from "react";
import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";


export default function Sign_up() {

        const [user, setUser] = React.useState<User | null>(null);
        const [loading, setLoading] = React.useState(false);
        const [userName, setUserName] = React.useState('');
        const [deleteUserModalVisible, setDeleteUserModalVisible] = React.useState(false);
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [showPassword, setShowPassword] = React.useState(false);
        
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
                        const response = await updateProfile(user, {
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

        const closeDeleteForm = () => {
                setEmail('');
                setPassword('');
                setDeleteUserModalVisible(false);

        }


        const HandleDeleteUser= async () => {
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
                <View style={styles.main}>
                        <View style={styles.center}>
                                <Text style={{ paddingBottom: 20, fontSize: 24, flexWrap: 'nowrap' }}> Your Account </Text>
                                <Text style={{ paddingBottom: 10, fontSize: 19, alignSelf: 'flex-start' }}> Your Username: </Text>

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



                                <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()} >
                                        <Text>Sign Out</Text>
                                </TouchableOpacity>
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
                                                        <Text style={{ marginBottom: 15, textAlign: 'center', }}>Hello World!</Text>
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
                                                                style={[{ backgroundColor: '#F194FF' }, { backgroundColor: '#2196F3' }]}
                                                                onPress={() => closeDeleteForm()}>
                                                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Close</Text>
                                                        </Pressable>
                                
                                                        
                                                </View>
                                        </View>
                                </Modal>



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
                width: 200,
                textAlign: 'left',
                outlineColor: "#235789",
                alignSelf: 'flex-start'
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
                alignSelf: 'flex-start',
                marginBottom: 20

        },

        buttonUpdate: {
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
                borderRadius: 20,
                width: 200,
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