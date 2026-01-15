import { useSignUp } from '@clerk/clerk-expo';
import { SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';


interface User {
  emailAddress: string;
  password: string;
  username: string;
}


const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [isLoading, setIsLoading] = useState(false)


  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

     const handleEmailSignUp = async (user: User) => {
    if (!isLoaded) return

    try {
      setIsLoading(true)
      await signUp.create({
        emailAddress: user.emailAddress,
        password : user.password,
        username : user.username
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  // const onVerifyPress = async () => {
  //   if (!isLoaded) return

  //   try {
  //     setIsLoading(true)
  //     const signUpAttempt = await signUp.attemptEmailAddressVerification({
  //       code,
  //     })

  //     if (signUpAttempt.status === 'complete') {
  //       await setActive({ session: signUpAttempt.createdSessionId })
  //       router.replace('/')
  //     } else {
  //       console.error(JSON.stringify(signUpAttempt, null, 2))
  //     }
  //   } catch (err) {
  //     console.error(JSON.stringify(err, null, 2))
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }


  if (!fontsLoaded) {
    return null;
  }

  if (pendingVerification) {
    return (
       router.push('/(auth)/otpVarify')
      // <SafeAreaView style={styles.container}>
      //   { <View style={{ padding: 20 }}>
      //     <Text style={styles.title}>Verify your email</Text>
      //     <TextInput
      //       value={code}
      //       placeholder="Enter your verification code"
      //       placeholderTextColor="#588169"
      //       style={[styles.textInput, { borderWidth: 1, borderColor: '#2d5c3f', padding: 10, borderRadius: 10, marginVertical: 10, color: 'white', }]}
      //       onChangeText={(code) => setCode(code)}
      //     />
      //     <TouchableOpacity onPress={onVerifyPress} style={styles.loginButton}>
      //       {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.loginButtonText}>Verify</Text>}
      //     </TouchableOpacity>
      //   </View> }
      //  </SafeAreaView> 

    )
  }

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          
          <View style={{ width: 24 }} />
        </View>

        <View style={{ alignItems: "center", marginTop: responsiveHeight(2) }}>
          <Text style={styles.subtitle}>Start your coding journey today.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor="#4b6052"
                style={styles.textInput}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <FontAwesome5 name="user-alt" size={18} color="#588169" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="name@example.com"
                placeholderTextColor="#4b6052"
                style={styles.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailAddress}
                onChangeText={setEmailAddress}
              />
              <MaterialIcons name="email" size={22} color="#588169" />
            </View>
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#4b6052"
                style={styles.textInput}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={22}
                  color="#588169"
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Re-Enter your password"
                placeholderTextColor="#4b6052"
                style={styles.textInput}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <MaterialIcons
                  name={showConfirmPassword ? "visibility" : "visibility-off"}
                  size={22}
                  color="#588169"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleEmailSignUp} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.loginButtonText}>Create Account</Text>}
          </TouchableOpacity>
        </View>



        {/* <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>


        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("@/assets/images/google.png")} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="github" size={24} color="#ffffffff" />
            <Text style={styles.socialButtonText}>Continue with GitHub</Text>
          </TouchableOpacity>
        </View> */}


        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
            <Text style={styles.signUpLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102217',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(5),
    marginTop: responsiveHeight(2),
  },
  backButton: {
    padding: 5
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#fff',
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#86968f',
    marginTop: responsiveHeight(0.6),
    fontWeight: "700"
  },
  formContainer: {
    marginTop: responsiveHeight(3),
  },
  inputContainer: {
    marginHorizontal: responsiveScreenWidth(5),
    marginBottom: responsiveHeight(2),
  },
  inputLabel: {
    fontSize: responsiveFontSize(2),
    color: '#fff', 
    fontFamily: 'SpaceGrotesk_700Bold', 
    marginBottom: responsiveHeight(1),
    fontWeight: "700"
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(3),
    paddingHorizontal: responsiveScreenWidth(4),
    height: responsiveHeight(6.5),
    borderWidth: 1.5,
    borderRadius: responsiveHeight(3.5),
    borderColor: '#326747',
    backgroundColor: '#1a3024',
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#fff',
    fontWeight: "800",
   
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: responsiveFontSize(2.2),
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
    opacity: 0.8
  },
  dividerText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#6b7280',
    marginHorizontal: 15,
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
    backgroundColor: '#1a3024',
    width: '100%',
    flexDirection: "row",
    gap: 10
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
    marginTop: responsiveHeight(15),
    marginBottom: responsiveHeight(2),
    
    
  
  },
  signUpText: {
    color: '#86968f',
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  signUpLink: {
    color: '#2bee79',
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: "bold"
  },
  socialIcon: {
    height: 24,
    width: 24,
    resizeMode: "contain"
  }
})