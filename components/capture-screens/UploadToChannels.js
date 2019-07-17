import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import CheckBox from "react-native-check-box";
import "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase/app";
import "firebase/storage";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

const CURRENT_PHOTO = FileSystem.documentDirectory + "photos";

export default class UploadToChannels extends React.Component {
  state = {
    channels: {},
    channel_names: [],
    chosen: {},
    text: "",
    photo: null,
    downloadUrl: "",
    photoId: ""
  };

  componentDidMount = () => {
    return fetch("https://ea862c3d.ngrok.io/channels")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          channels: responseJson,
          channel_names: Object.keys(responseJson),
          photo: this.props.navigation.state.params.photo
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  saveToGallery = async () => {
    const storage = firebase.storage();
    const storageRef = storage.ref("images");
    const { photo } = this.state;
    const photoUri = CURRENT_PHOTO + "/" + photo;
    if (photo.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }

      const promise = MediaLibrary.createAssetAsync(photoUri);

      let response = await fetch(photoUri);
      const blob = await response.blob();
      promise.then(() => {
        const spaceRef = storageRef.child(
          JSON.stringify(promise["_55"]["creationTime"])
        );
        spaceRef
          .put(blob)

          .then(snapshot => {
            const { path } = snapshot.ref.location;

            const pathArr = path.split("/");
            const photoId = pathArr[pathArr.length - 1];
            return firebase
              .storage()
              .ref(`${path}`)
              .getDownloadURL()
              .then(url => {
                this.setState({ downloadUrl: url, photoId });
              });
          })
          .then(() => {
            console.log(this.state.downloadUrl, this.state.photoId);
            return fetch("https://ea862c3d.ngrok.io/images", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                caption: this.state.text,
                geolocation: this.props.navigation.state.params.photoLocation,
                relevant_channels: Object.keys(this.state.chosen).filter(
                  key => this.state.chosen[key] === true
                ),
                event_img: this.state.downloadUrl,
                id: this.state.photoId
              })
            });
          })
          .then(() =>
            this.props.navigation.navigate("SingleImageScreen", {
              downloadUrl: this.state.downloadUrl,
              photoId: this.state.photoId
            })
          );
      });
    }
  };

  render() {
    const { channel_names } = this.state;
    // console.log("photo location", this.props.navigation.state.params);
    return (
      <View style={{ flex: 1 }}>
        <Text>Share to Channels</Text>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          {channel_names.map(channel => {
            return (
              <View
                key={channel}
                style={{ flex: 1, alignSelf: "stretch", margin: 5 }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "stretch",
                    borderRadius: 5,
                    padding: 15,
                    backgroundColor: "#E6B655"
                  }}
                >
                  <CheckBox
                    onClick={() => {
                      if (!this.state.chosen[channel]) {
                        this.setState({
                          chosen: { ...this.state.chosen, [channel]: true }
                        });
                      } else
                        this.setState({
                          chosen: { ...this.state.chosen, [channel]: false }
                        });
                    }}
                    isChecked={this.state.chosen[channel]}
                    rightText={channel}
                  />
                </View>
              </View>
            );
          })}
          <View style={{ flex: 1, alignSelf: "stretch", margin: 5 }}>
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <Button
              title="Share"
              onPress={() => {
                this.saveToGallery();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
