
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Alert, ActivityIndicator } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import { useSSO } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';


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

  const { startSSOFlow } = useSSO()
  const { signIn, setActive, isLoaded } = useSignIn()
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = useState(false)




  const handleSSOSignIn = useCallback(async (strategy: SSOStrategy) => {

    try {
      setIsLoading(true)
      const { createdSessionId, setActive: setActiveSession } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      if (createdSessionId && setActiveSession) {
        await setActiveSession({ session: createdSessionId })
        router.replace("/(tabs)/Home")

      }
    } catch (error) {

      console.error(`${strategy} sign-in error:`, JSON.stringify(error, null, 2));

    }
    finally {
      setIsLoading(false);
    }


  }, [startSSOFlow, router])



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



  return (
    <SafeAreaView style={styles.container}>



      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>



      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Ready to solve your next challenge?</Text>
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email or Username</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={26} color="#92c9a8" />
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
          <MaterialIcons name="lock" size={26} color="#92c9a8" />
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
              size={24}
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
         onPress={() => handleEmailSignIn}
         disabled = {isLoading}
         >
          { isLoading ? (
            <ActivityIndicator  color= "#000"/>
          ) : (
            <Text style={styles.loginButtonText}> Login In</Text>
          )}
        </TouchableOpacity>
      </View>


      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>Or continue with</Text>
      </View>


      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleSSOSignIn("oauth_google")}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => handleSSOSignIn("oauth_github")}>
          <Text style={styles.socialButtonText}>Continue with GitHub</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/Signup")}>
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
    backgroundColor: '#111d15',
  },
  backButton: {
    marginLeft: responsiveScreenWidth(5),
    marginTop: responsiveHeight(1.2),
  },
  headerContainer: {
    margin: responsiveScreenWidth(5),
  },
  title: {
    fontSize: responsiveFontSize(4),
    fontWeight: '900',
    color: '#fff',
  },
  subtitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: 'gray',
    marginTop: responsiveHeight(0.5),
  },
  inputContainer: {
    marginHorizontal: responsiveScreenWidth(5),
    marginBottom: responsiveHeight(1.2),
  },
  inputLabel: {
    fontSize: responsiveFontSize(2),
    color: '#dad4d4',
    fontWeight: '600',
    marginBottom: responsiveHeight(1.2),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(2.5),
    paddingHorizontal: responsiveScreenWidth(4),
    height: responsiveHeight(8),
    borderWidth: 1.2,
    borderRadius: responsiveHeight(4),
    borderColor: '#2d5c3f',
    backgroundColor: '#193324',
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: '#588169',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: responsiveHeight(1.2),
  },
  forgotPasswordText: {
    color: '#dad4d4',
    fontSize: responsiveFontSize(1.9),
  },
  loginButtonContainer: {
    marginHorizontal: responsiveScreenWidth(7),
    marginTop: responsiveHeight(5),
  },
  loginButton: {
    height: responsiveHeight(7.5),
    borderRadius: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2bee79',
  },
  loginButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '800',
    color: '#000',
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: responsiveHeight(2.5),
  },
  dividerText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: 'gray',
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialButton: {
    borderWidth: 1,
    height: responsiveHeight(7.5),
    borderRadius: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#193324',
    width: responsiveScreenWidth(85),
    marginVertical: responsiveHeight(1),
  },
  socialButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.1),
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(5),
  },
  signUpText: {
    color: 'gray',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  signUpLink: {
    color: '#2bee79',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
  loginButtonDisabled :{
    opacity : 0.6
  }
});