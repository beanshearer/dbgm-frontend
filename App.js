import { createStackNavigator, createAppContainer } from "react-navigation";
import React from "react";
import MapScreen from "./components/map-screen/MapScreen";
import PhotoScreen from "./components/photo-screens/PhotoScreen";
import UploadToChannels from "./components/photo-screens/UploadToChannels"
import GalleryScreen from "./components/photo-screens/GalleryScreen"
import HomeScreen from "./components/home-screen/HomeScreen"
import AllChannels from "./components/all-channels-screen/AllChannels"
import RegisterScreen from "./components/register-screen/RegisterScreen"

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: AllChannels,
    SignIn: RegisterScreen,
    Map: MapScreen,
    PhotoScreen,
    UploadToChannels,
    GalleryScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
