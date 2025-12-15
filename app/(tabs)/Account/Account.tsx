import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicon from '@expo/vector-icons/Ionicons'

const Account = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  return (
    <SafeAreaView style={styles.container}>

      <View style={{ marginBottom: 20  }}>
        <View style={{flexDirection:"row",}}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
          </View>
        </View>
        <View style={{ alignItems:"center" }}>
          <Text style={styles.subtitle}>Start your coding journey today.</Text>
        </View>
      </View>




      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor="#588169"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FontAwesome5 name="user-alt" size={23} color="#92c9a8" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputWrapper}>
          
          <TextInput
            placeholder="name@example.com"
            placeholderTextColor="#588169"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <MaterialIcons name="email" size={26} color="#92c9a8" />
        </View>
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputWrapper}>
          
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#588169"
            style={styles.textInput}
            secureTextEntry={!showPassword1}
          />
          <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
            <MaterialIcons
              name={showPassword1 ? "visibility" : "visibility-off"}
              size={24}
              color="#92c9a8"
            />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
           
            <TextInput
              placeholder="Re-Enter password"
              placeholderTextColor="#588169"
              style={styles.textInput}
              secureTextEntry={!showPassword2}
            />
            <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
              <MaterialIcons
                name={showPassword2 ? "visibility" : "visibility-off"}
                size={24}
                color="#92c9a8"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.dividerContainer}>
        
        <Text style={styles.dividerText}>Or continue with</Text>
        
      </View>


      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicon name='logo-google' size={24} color={"#c94322ff"}/>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome5 name="github" size={26} color="#ffffffff" />
          <Text style={styles.socialButtonText}>Continue with GitHub</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>LogIn</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111d15',
  },
  backButton: {
    marginLeft: responsiveScreenWidth(5),
    marginTop: responsiveHeight(1.2),
    marginRight:80
    
  },
  headerContainer: {
    margin: responsiveScreenWidth(2),
    justifyContent: "center",
    alignContent:"center"

  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '900',
    color: '#fff',
  },
  subtitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: '#a0b4a6',
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
    height: responsiveHeight(6),
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
    height: responsiveHeight(6),
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
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#193324',
    width: responsiveScreenWidth(85),
    marginVertical: responsiveHeight(1),
    flexDirection:"row",
    gap:10
  },
  socialButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.1),
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
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
})