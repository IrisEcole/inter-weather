import FontAwesome from '@expo/vector-icons/FontAwesome';
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color='blue'/>,
        }}
      />
     
<Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          href: user? '/account' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
<Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          href: user? null : '/login',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
     
      
     
    </Tabs>
  );
}
