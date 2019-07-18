import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { Location } from "expo";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import Marker from "./Marker";
// import * as Location from "expo-location";

export default class MapScreen extends Component {
  state = {
    errorMessage: "",
    region: {},
    images: {},
    imageIds: []
  };

  componentWillMount() {
    this.getLocation();
  }
  componentDidMount() {
    this.getImages()
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          images: responseJson,
          imageIds: Object.keys(responseJson)
        });
      })
      //   .then(() => {
      //     console.log(this.state);
      //   })
      .catch(error => {
        console.error(error);
      });
  }

  getImages = () => {
    return fetch("https://ea862c3d.ngrok.io/images");
  };

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!!");
      this.setState({ errorMessage: "Permission not granted" });
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const region = this.regionFrom(
          position.coords.latitude,
          position.coords.longitude,
          1000
        );
        this.setState({
          region
        });
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 30000 }
    );

    // const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // this.setState({ location });
    // .then(() => this.setState({ location }));
  };

  regionFrom(lat, lon, distance) {
    distance = distance / 2;
    const circumference = 40075;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const angularDistance = distance / circumference;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = Math.abs(
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(lat),
        Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
      )
    );

    return (result = {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta
    });
  }

  render() {
    const { region, imageIds } = this.state;
    return imageIds.length > 0 ? (
      <>
        <MapView
          initialRegion={region}
          style={{ flex: 1 }}
          showsUserLocation={true}
        >
          {imageIds.map(id => {
            return <Marker key={id} info={this.state.images[id]} />;
          })}
        </MapView>
      </>
    ) : (
      <>
        <MapView
          initialRegion={region}
          style={{ flex: 1 }}
          showsUserLocation={true}
        />
      </>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
