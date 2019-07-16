import { createStackNavigator, createAppContainer } from "react-navigation";
import React from "react";
import MapScreen from "./components/map-screen/MapScreen";
import CaptureScreen from "./components/capture-screens/CaptureScreen";
import UploadToChannels from "./components/capture-screens/UploadToChannels"
import GalleryScreen from "./components/capture-screens/GalleryScreen"
import NavigationScreen from "./components/navigation-screen/NavigationScreen"
import AllChannels from "./components/all-channels-screen/AllChannels"
import RegisterScreen from "./components/register-screen/RegisterScreen"
import SignInScreen from "./components/sign-in-screen/SignInScreen"
import SingleChannelScreen from "./components/single-channel-screen/SingleChannelScreen"
import SingleImageScreen from "./components/single-image-screen/SingleImageScreen"
import HomeScreen from "./components/home-screen/HomeScreen"
import AccountManagementScreen from "./components/acount-management-screen/AccountManagementScreen"
import config from "./config";
import * as firebase from "firebase/app";

firebase.initializeApp(config);

const AppNavigator = createStackNavigator(
  {
    AccountManagementScreen,
    NavigationScreen,
    HomeScreen,
    SingleImageScreen,
    AllChannels,
    SingleChannelScreen,
    RegisterScreen,
    SignInScreen,
    MapScreen,
    CaptureScreen,
    UploadToChannels,
    GalleryScreen
  },
  {
    initialRouteName: "NavigationScreen"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    username: "",
  }

  render() {
    return <AppContainer />;
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User is signed in.')
        const { username } = user
        console.log(user)
      } else {
        console.log('User is signed out')
      }
    })
  }
}
