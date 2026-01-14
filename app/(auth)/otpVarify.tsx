import { useSignUp } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { responsiveFontSize as rf, responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions';

interface user {
  emailAddress: string;
  password: string;
  username: string;
}

const otpVarify = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [pendingVerification, setPendingVerification] = React.useState(false)





  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[0];
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  };

  const handleEmailSignUp = async (user: user) => {
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

  const handleResendOTP = () => {
    setTimer(59);
    console.log('Resending OTP...');

  };

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      setIsLoading(true)
      const otpCode = code.join('')
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace("./TabLayout")
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <MaterialIcons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
        </View>


        <View style={styles.content}>
          <View style={styles.topSection}>

            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🔓</Text>
            </View>


            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.subtitle}>
              We have sent the verification code to your email address.
            </Text>
          </View>


          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  digit && styles.codeInputFilled,
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={onVerifyPress}
              activeOpacity={0.8}
            >
              <Text style={styles.verifyButtonText}>Verify Account</Text>
            </TouchableOpacity>


            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive code?</Text>
              <TouchableOpacity onPress={handleResendOTP} disabled={timer > 0}>
                <Text style={[styles.resendButton, timer > 0 && styles.resendButtonDisabled]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
              <Text style={styles.timer}>{formatTime(timer)}</Text>
            </View>
          </View>
        </View>



      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: rw(4),
    paddingTop: rh(4),
    paddingBottom: rh(1),
  },
  backButton: {
    width: rw(12),
    height: rw(12),
    borderRadius: rw(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: rf(3),
  },
  content: {
    flex: 1,
    paddingHorizontal: rw(6),
    justifyContent: 'center',
    paddingBottom: rh(10),
  },
  topSection: {
    alignItems: 'center',
    marginBottom: rh(5),
  },
  iconContainer: {
    width: rw(20),
    height: rw(20),
    borderRadius: rw(10),
    backgroundColor: 'rgba(43, 238, 121, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(43, 238, 121, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rh(3),
    shadowColor: '#2bee79',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  iconText: {
    fontSize: rf(4),
  },
  title: {
    color: '#FFFFFF',
    fontSize: rf(3.5),
    fontWeight: 'bold',
    marginBottom: rh(1.5),
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: rf(1.8),
    textAlign: 'center',
    lineHeight: rf(2.5),
    maxWidth: rw(80),
    fontWeight: '500',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: rw(2),
    marginBottom: rh(5),
  },
  codeInput: {
    width: rw(12),
    height: rw(12),
    borderRadius: rw(3),
    backgroundColor: '#1f2937',
    color: '#FFFFFF',
    fontSize: rf(3),
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  codeInputFilled: {
    borderColor: '#2bee79',
    shadowColor: '#2bee79',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonContainer: {
    width: '100%',
  },
  verifyButton: {
    width: '100%',
    height: rh(7),
    backgroundColor: '#2bee79',
    borderRadius: rw(3),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2bee79',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  verifyButtonText: {
    color: '#111827',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(3),
    gap: rw(1.5),
  },
  resendText: {
    color: '#9ca3af',
    fontSize: rf(1.7),
  },
  resendButton: {
    color: '#2bee79',
    fontSize: rf(1.7),
    fontWeight: 'bold',
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  timer: {
    color: '#6b7280',
    fontSize: rf(1.7),
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginLeft: rw(1),
  },
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: rh(20),
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#111827',
    opacity: 0.8,
    zIndex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
});

export default otpVarify;