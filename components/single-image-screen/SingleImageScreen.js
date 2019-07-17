import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default class SingleImageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>HOME</Text>,
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CaptureScreen");
            }}
          >
            <Image
              source={require("../../buttons/camera.png")}
              style={{ width: 40, height: 40 }}
            />
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
        <Text>HI</Text>
        <Image
          source={{
            uri: downloadUrl
          }}
          style={{ width: 500, height: 500 }}
        />
      </View>
    );
  }
}
