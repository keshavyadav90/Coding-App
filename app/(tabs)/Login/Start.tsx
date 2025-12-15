import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';


const FEATURES = [
  { icon: 'bolt', iconType: 'material', text: 'Master Python & JS in minutes a day' },
  { icon: 'extension-puzzle', iconType: 'ionicon', text: 'Solve interactive bite-sized challenges' },
  { icon: 'phone-portrait', iconType: 'ionicon', text: 'Build real projects on your phone' },
];

const Start = () => {
  const handleGetStarted = () => {
  
    console.log('Get Started pressed');
  };

  const handleLogin = () => {
   
    console.log('Login pressed');
  };

  const renderFeatureItem = (feature: typeof FEATURES[0], index: number) => (
    <View key={index} style={styles.iconContainer}>
      <View style={styles.icon}>
        {feature.iconType === 'material' ? (
          <MaterialIcons name={feature.icon as any} size={35} color="#2bee79" />
        ) : (
          <Ionicons name={feature.icon as any} size={24} color="#2bee79" />
        )}
      </View>
      <Text style={styles.iconText}>{feature.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
  
      <View style={styles.header}>
        <MaterialIcons name="terminal" size={30} color="#2bee79" />
        <Text style={styles.headerText}>CodeCraft</Text>
      </View>

   
      <View style={styles.heroImageContainer}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqhZS0Sbp8cnymA2irmbu4fCjHSBMLYZ-HIW2GJB6y_pnn2oH6U10MxM5Ii_fWJEt9LXXB5hmBoD9amyqHrUoeJ62v9viwa9PoP53XvNtk5-r4Ytr-yRAsyWpPcCQfj0zv0p1PiXR7_4gHQ3Y1W6_laXqTTp13YALuB4YUP-Gxj04sUIKrS-D9kW0b7T-_nxKq6sz3yuXISFYsfFHosDjHLlCIBSs3tqKeCZUi88KmB9KMHM3V2LWNZbED5zrYh8tNcoKP--d_DJI',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

 
      <View style={styles.featuresSection}>
        {FEATURES.map(renderFeatureItem)}
      </View>

    
      <View style={styles.bottomSection}>
     
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

       
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111d15',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(2.5),
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveHeight(1),
  },
  headerText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: 'white',
  },
  heroImageContainer: {
    alignItems: 'center',
  },
  heroImage: {
    width: responsiveScreenWidth(92),
    height: responsiveHeight(38),
    borderRadius: responsiveHeight(5),
  },
  featuresSection: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(2),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(4),
    marginHorizontal: responsiveScreenWidth(5),
    marginVertical: responsiveHeight(1),
  },
  icon: {
    height: responsiveHeight(5.5),
    width: responsiveHeight(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(2.75),
    backgroundColor: '#113820',
  },
  iconText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: responsiveHeight(3),
  },
  button: {
    height: responsiveHeight(7),
    width: responsiveScreenWidth(90),
    borderRadius: responsiveHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2bee79',
  },
  buttonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '900',
    color: 'black',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2.5),
  },
  bottomText: {
    color: 'gray',
    fontSize: responsiveFontSize(2),
  },
  loginText: {
    color: '#2bee79',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    marginLeft: responsiveScreenWidth(1.5),
  },
});