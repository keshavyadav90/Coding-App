import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
export default function TabLayout() {

  const colorScheme = useColorScheme();
  const {isSignedIn , isLoaded} = useAuth();

  if(!isLoaded) {
    return (
      <View>
        <ActivityIndicator  size= "large"/>
      </View>
    )
  }
  if(!isSignedIn) {
    return <Redirect href= "/(auth)/Login"/>
  }



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: () => <View style={{backgroundColor:'#102217'}}/>
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color,size  }) => <Entypo  size={size} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color ,size }) => <FontAwesome5  size={size} name="laptop-code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color,size  }) => <FontAwesome5 name="trophy" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color,size  }) => <Ionicons name="bar-chart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color ,size }) => <FontAwesome5 name="user-alt" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
