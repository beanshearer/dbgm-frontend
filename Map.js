import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { Location, Permissions, MapView } from "expo";
// import * as Location from "expo-location";

class Map extends Component {
  state = {
    errorMessage: "",
    region: {}
  };

  componentWillMount() {
    this.getLocation();
  }

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
    const { region } = this.state;
    return (
      <>
        <MapView region={region} style={{ flex: 1 }} showsUserLocation={true}>
          <MapView.Marker
            coordinate={{
              longitude: +region.longitude,
              latitude: +region.latitude
            }}
            title="Hi"
            description="You are here..."
          />
        </MapView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Map;
