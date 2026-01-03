// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack ,Redirect} from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
// import {ClerkProvider} from "@clerk/clerk-expo"
// import { tokenCache } from '@clerk/clerk-expo/token-cache';
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { useAuth } from '@clerk/clerk-expo';



// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ClerkProvider tokenCache={tokenCache}>
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{headerShown:false}}>
//         <Stack.Screen name='Signup' options={{presentation: 'modal', title: 'Signup'}}/>
//         <Stack.Screen name="Login" options={{ presentation: 'modal', title: 'Login' }} />
//          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name='Splash' options={{ presentation: 'modal', title: "Splash" }} />
//         <Stack.Screen name="Start" options={{ presentation: 'modal', title: 'Start' }} />
//         <Stack.Screen name='Home' options={{ presentation: 'modal', title: "Home" }} />
//         <Stack.Screen name='Practice' options={{ presentation: 'modal', title: "Practice" }} />
//         <Stack.Screen name='Challenges' options={{ presentation: 'modal', title: "Challenges" }} />
//         <Stack.Screen name='Progress' options={{ presentation: 'modal', title: "Progress" }} />
//         <Stack.Screen name='Profile' options={{ presentation: 'modal', title: "Profile" }} />
//       </Stack>

//       <StatusBar style="auto" />
//     </ThemeProvider>
//     </ClerkProvider>
//   );
// }


import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { TokenCaches } from "../utils/clerkTokenCache";


export default function RootLayout() {
  return (

    <ClerkProvider 
    publishableKey="pk_test_aHVtYW5lLWphd2Zpc2gtNDYuY2xlcmsuYWNjb3VudHMuZGV2JA"
    tokenCache={TokenCaches}
    
    >
      <Slot />
    </ClerkProvider>
  )
}