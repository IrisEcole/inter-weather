import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';




export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: 'blue', tabBarPosition: 'top', tabBarStyle: {
      height: 70,
      borderWidth: 1,
      },}} >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
     
    </Tabs>
  );
}
