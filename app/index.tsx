// import React from 'react'
// import { StyleSheet, View,Text } from 'react-native'
// import Start from './Start'
// import { AppRegistry } from 'react-native'
// import RootLayout from './_layout'


// const index = () => {
//   return (
//     <Start/>
//   )
// }

// export default index

// const styles = StyleSheet.create({

// })
// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);



import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function index() {
  const { isSignedIn} = useAuth();

  if(isSignedIn){
    return <Redirect href= "/Home"/>
  }
  
   return <Redirect href= '/Login' />

}



















