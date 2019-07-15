// In App.js in a new project

import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import PhotoScreen from "./PhotoScreen"
import UploadToChannels from "./UploadToChannels"
import GalleryScreen from "./GalleryScreen"


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Take a photo!"
          onPress={() => this.props.navigation.navigate('PhotoScreen')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
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
