
import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { useNavigation, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';



WebBrowser.maybeCompleteAuthSession()
const useWarmupBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return
    void WebBrowser.warmUpAsync()

    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}



type SSOStrategy = 'oauth_google' | 'oauth_github';


const Login = () => {

  useWarmupBrowser();

  /* useSSO removed */
  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: startGithubFlow } = useOAuth({ strategy: 'oauth_github' })

  const { signIn, setActive, isLoaded } = useSignIn()
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = useState(false)

  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const handleSSOSignIn = useCallback(async (strategy: SSOStrategy) => {
    try {
      setIsLoading(true)

      const startOAuthFlow = strategy === 'oauth_google' ? startGoogleFlow : startGithubFlow;

      // Create a proper redirect URL for OAuth callback
      const redirectUrl = Linking.createURL('/(tabs)/Home', { scheme: 'expoapp' });
      console.log('OAuth redirectUrl:', redirectUrl);

      const { createdSessionId, setActive: setActiveSession } = await startOAuthFlow({
        redirectUrl,
      })

      if (createdSessionId && setActiveSession) {
        await setActiveSession({ session: createdSessionId })
        router.replace("/(tabs)/Home")
      }
    } catch (error) {
      console.error(`${strategy} sign -in error: `, JSON.stringify(error, null, 2));
    }
    finally {
      setIsLoading(false);
    }
  }, [startGoogleFlow, startGithubFlow, router])



  const handleEmailSignIn = async () => {

    if (!isLoaded || !emailAddress || !password) {
      Alert.alert("Please fill in all fields");
      return;

    }
    try {
      setIsLoading(true);

      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })


      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/(tabs)/Home")
      } else {

        console.error('Sign-in incomplete:', JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {

      console.error('Email sign-in error:', JSON.stringify(err, null, 2));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>



      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>Welcome Back</Text>
          <View style={styles.cursor} />
        </View>
        <Text style={styles.subtitle}>Ready to solve your next challenge?</Text>
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email or Username</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={20} color="#92c9a8" />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#588169"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
            editable={!isLoading}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={20} color="#92c9a8" />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#588169"
            style={styles.textInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />


          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="#92c9a8"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={() => handleEmailSignIn()}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>


      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.dividerLine} />
      </View>


      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleSSOSignIn("oauth_google")}>
          <Image source={require("@/assets/images/google.png")} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.socialButton} onPress={() => handleSSOSignIn("oauth_github")}>
          <FontAwesome5 name="github" size={24} color="#ffffffff" />
          <Text style={styles.socialButtonText}>Continue with GitHub</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/Signup')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102217',
  },
  backButton: {
    marginLeft: responsiveScreenWidth(5),
    marginTop: responsiveHeight(1.2),
  },
  headerContainer: {
    margin: responsiveScreenWidth(5),
    marginTop: responsiveHeight(2),
  },
  title: {
    fontSize: responsiveFontSize(3.6),
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    fontWeight: "bold"

  },
  cursor: {
    width: 10,
    height: 30,
    backgroundColor: '#15803d',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: responsiveFontSize(2.0),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#86968f',
    marginTop: responsiveHeight(1),
    fontWeight: "700"

  },
  inputContainer: {
    marginHorizontal: responsiveScreenWidth(5),
    marginBottom: responsiveHeight(2),
  },
  inputLabel: {
    fontSize: responsiveFontSize(2.0),
    color: '#dad4d4',
    fontFamily: 'SpaceGrotesk_600SemiBold',
    marginBottom: responsiveHeight(1.2),
    fontWeight: "600"
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(3),
    paddingHorizontal: responsiveScreenWidth(4),
    height: responsiveHeight(6.5),
    borderWidth: 1.7,
    borderRadius: responsiveHeight(3.5),
    borderColor: '#326747',
    backgroundColor: '#162e21',

  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#fff',
    fontWeight: "600"

  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: responsiveHeight(1.2),
  },
  forgotPasswordText: {
    color: '#dad4d4',
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'SpaceGrotesk_500Medium',
    fontWeight: "700"
  },
  loginButtonContainer: {
    marginHorizontal: responsiveScreenWidth(5),
    marginTop: responsiveHeight(3),
  },
  loginButton: {
    height: responsiveHeight(6.5),
    borderRadius: responsiveHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2bee79',
    shadowColor: '#2bee79',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#000',
    fontWeight: "bold"

  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(4),
    marginHorizontal: responsiveScreenWidth(5),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#326747',
    opacity: 1,
  },
  dividerText: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#86968f',
    marginHorizontal: 15,
    fontWeight: "700"
  },
  socialContainer: {
    alignItems: 'center',
    gap: responsiveHeight(2),
    marginHorizontal: responsiveScreenWidth(5),

  },
  socialButton: {
    // borderWidth: 1,
    borderColor: '#326747',
    height: responsiveHeight(6.5),
    borderRadius: responsiveHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#162e21',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: "600"
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(2),
  },
  signUpText: {
    color: '#86968f',
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'SpaceGrotesk_500Medium',
    fontWeight: "700"
  },
  signUpLink: {
    color: '#2bee79',
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: "700"

  },
  loginButtonDisabled: {
    opacity: 0.6
  },
  socialIcon: {
    height: 24,
    width: 24,
    resizeMode: "contain"
  }
});
