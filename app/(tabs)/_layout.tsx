import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { onAuthStateChanged, User } from "firebase/auth";
import React from 'react';
import { FIREBASE_AUTH } from "../../firebaseConfig";

export default function TabLayout() {
  const [user, setUser] = React.useState<User | null>(null);

  //User persistence 
  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: 'blue', tabBarStyle: {
      backgroundColor: 'white',
      position: 'absolute',
      borderTopWidth: 0,
      elevation: 0,
      opacity: 0.7,
      },}} >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-circle-outline" size={24} color="black" />,
        }}
      />
     
<Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          href: user? '/account' : null,
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color="black" />,
        }}
      />
<Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          href: user? null : '/login',
          tabBarIcon: ({ color }) => <AntDesign name="login" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          href: user? null : '/register',
          tabBarIcon: ({ color }) => <Ionicons name="person-add-outline" size={24} color="black" />,
        }}
      />
     
      
     
    </Tabs>
  );
}
