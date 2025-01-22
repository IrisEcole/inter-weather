import { Redirect } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";


export default function Sign_up() {

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

        const auth = FIREBASE_AUTH;
 

        return (
                <View style={styles.main}>
                        

                                                <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()} >
                                                        <Text>Sign Out</Text>
                                                </TouchableOpacity>
                                               




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