import React from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";

export default class SingleImageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>PHOTO</Text>,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllChannels");
          }}
        >
          <Image
            source={require("../../logos/logo-transparent-background.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
            <Image source={require('../../buttons/home.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      )
    };
  };


  render() {
    console.log("props", this.props.navigation.state.params);
    const { photoId, downloadUrl } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri: downloadUrl
          }}
          style={{ width: 500, height: 450 }}
        />
        <Button
          title={'Go to map!'}
          onPress={() => {
            this.props.navigation.navigate("MapScreen");
          }}>Go to map!</Button>
      </View >
    );
  }
}
