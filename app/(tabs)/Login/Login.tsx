
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
     
      <TouchableOpacity style={styles.backButton}>
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
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>Or continue with</Text>
      </View>

      
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with GitHub</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity>
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
});