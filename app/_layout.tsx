import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="Login" options={{ presentation: 'modal', title: 'Login' }} />
        <Stack.Screen  name='Splash' options={{ presentation : 'modal', title : "Splash"}}/>
        <Stack.Screen name="Start" options={{ presentation: 'modal', title: 'Start' }} />
        <Stack.Screen name='Home' options={{presentation:'modal', title:"Home"}}/>
        <Stack.Screen name='Practice' options={{presentation:'modal', title:"Practice"}}/>
        <Stack.Screen name='Challenges' options={{presentation:'modal', title:"Challenges"}}/>
        <Stack.Screen name='Progress' options={{presentation:'modal', title:"Progress"}}/>
        <Stack.Screen name='Profile' options={{presentation:'modal', title:"Profile"}}/>

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
