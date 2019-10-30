import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk';
import Reducers from './src/2.reducers'
import firebase from 'firebase'
import TodoListScreen from './src/components/TodoListScreen';
import TodoStack from './src/navigators/TodoStack';


export default function App() {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk))
  const [load, setLoad] = useState(false)

  useEffect( () => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    })
    .then(() => setLoad(true))
    
  })

  // Replace config ini dengan config kalian sendiri ya gengs
  var firebaseConfig = {
    apiKey: "AIzaSyCc2Wd-pr3bky6Zck-lq2wYgaCKKtPvatI",
    authDomain: "mobile-exam-a0a95.firebaseapp.com",
    databaseURL: "https://mobile-exam-a0a95.firebaseio.com",
    projectId: "mobile-exam-a0a95",
    storageBucket: "mobile-exam-a0a95.appspot.com",
    messagingSenderId: "332634239064",
    appId: "1:332634239064:web:238e975172fbf35f885a2d"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  console.disableYellowBox = true
  if(load){
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <TodoStack />
        </View>
      </Provider>
    );
  }else{
    return (
      <View></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
