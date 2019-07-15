import { createStackNavigator, createAppContainer } from "react-navigation";
import React from "react";
import MapScreen from "./components/map-screen/MapScreen";
import PhotoScreen from "./components/photo-screens/PhotoScreen";
import UploadToChannels from "./components/photo-screens/UploadToChannels"
import GalleryScreen from "./components/photo-screens/GalleryScreen"
import HomeScreen from "./components/home-screen/HomeScreen"
import AllChannels from "./components/all-channels-screen/AllChannels"
import RegisterScreen from "./components/register-screen/RegisterScreen"
import SignInScreen from "./components/sign-in-screen/SignInScreen"

const AppNavigator = createStackNavigator(
  {
    HomeScreen,
    AllChannels,
    RegisterScreen,
    SignInScreen,
    MapScreen,
    PhotoScreen,
    UploadToChannels,
    GalleryScreen
  },
  {
    initialRouteName: "HomeScreen"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
