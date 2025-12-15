// import { Tabs } from 'expo-router';
// import React from 'react';

// import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}>
//       <Tabs.Screen
//         name="Home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <Entypo  size={28} name="home" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="Practice"
//         options={{
//           title: 'Practice',
//           tabBarIcon: ({ color }) => <FontAwesome5  size={28} name="laptop-code" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="Challenges"
//         options={{
//           title: 'Challenges',
//           tabBarIcon: ({ color }) => <FontAwesome5 name="trophy" size={24} color="black" />,
//         }}
//       />
//       <Tabs.Screen
//         name="Progress"
//         options={{
//           title: 'Progress',
//           tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color="black" />,
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color="black" />,
//         }}
//       />
//     </Tabs>
//   );
// }




import React from 'react'
import { StyleSheet } from 'react-native'
import Start from './Login/Start'
import Account from './Account/Account'
import Experience from './Account/Experience'
import Expertise from './Account/Expertise'
import Home from './BottomNavigation/Home';
import Practice from './BottomNavigation/Practice';
import Challenges from './BottomNavigation/Challenges';
const _layout = () => {
  return (
    <Challenges/>
  )
}

export default _layout

const styles = StyleSheet.create({})
