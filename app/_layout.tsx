import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack ,Redirect ,} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {ClerkProvider} from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useColorScheme } from '@/hooks/use-color-scheme';


const CLERK_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if(!CLERK_PUBLIC_API_KEY) {
  throw new Error ('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file')
}
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider
     tokenCache={tokenCache}
     publishableKey={CLERK_PUBLIC_API_KEY}
     >
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen  name='(auth)' options={{ headerShown : false}}/>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='Splash' options={{ presentation: 'modal', title: "Splash" }} />
        <Stack.Screen name="Start" options={{ presentation: 'modal', title: 'Start' }} />
        <Stack.Screen name='Home' options={{ presentation: 'modal', title: "Home" }} />
        <Stack.Screen name='Practice' options={{ presentation: 'modal', title: "Practice" }} />
        <Stack.Screen name='Challenges' options={{ presentation: 'modal', title: "Challenges" }} />
        <Stack.Screen name='Progress' options={{ presentation: 'modal', title: "Progress" }} />
        <Stack.Screen name='Profile' options={{ presentation: 'modal', title: "Profile" }} />
        <Stack.Screen name='codeEditor' options={{ presentation: 'modal', title: "codeEditor" }} />
        
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
    </ClerkProvider>
  );
}


// import { ClerkProvider } from "@clerk/clerk-expo";
// import { Slot } from "expo-router";
// import { TokenCaches } from "../utils/clerkTokenCache";


// export default function RootLayout() {
//   return (

//     <ClerkProvider 
//    
//     tokenCache={TokenCaches}

    
//     >
//       <Slot />
//     </ClerkProvider>
//   )
// }