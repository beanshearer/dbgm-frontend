import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MediaLibrary } from "expo";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import Photo from "./Photo";

const CURRENT_PHOTO = FileSystem.documentDirectory + "photos";

export default class GalleryScreen extends React.Component {
  state = {
    coordinates: {},
    photo: null,
    selected: []
  };

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!!");
      this.setState({ errorMessage: "Permission not granted" });
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const coordinates = position.coords;
        this.setState({ coordinates });
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(CURRENT_PHOTO);
    this.setState({ photo: photos[photos.indexOf("current-photo.jpg")] });
    this.getLocation();
  };

  renderPhoto = fileName => (
    <Photo key={fileName} uri={`${CURRENT_PHOTO}/${fileName}`} />
  );

  render() {
    const { coordinates, photo } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.pictures}>
          {this.renderPhoto(this.state.photo)}
        </View>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={this.props.onPress}
        >
          <MaterialIcons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() =>
            this.props.navigation.navigate("UploadToChannels", {
              photoLocation: coordinates,
              photo
            })
          }
        >
          <Text style={styles.whiteText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'white',
  },
  rightButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 20
  },
  leftButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
    // backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1
  },
  whiteText: {
    color: "white"
  }
});
