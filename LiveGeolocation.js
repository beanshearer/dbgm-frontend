import React, { Component } from 'react';
import { Text, View } from 'react-native';

class LiveGeolocation extends Component {
  state = { latitude: null, longitude: null, error: null };

  componentDidMount() {
    let watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(watchId);
  }

  render() {
    const { latitude, longitude, error } = this.state;
    return (
      <View>
        <Text>Latitude:: {latitude}</Text>
        <Text>Longitude:: {longitude}</Text>
        {error ? <Text>Error: {error}</Text> : null}
      </View>
    );
  }
}

export default LiveGeolocation;
