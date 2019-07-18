import React from "react";
import MapView from "react-native-maps";

export default class Marker extends React.Component {
  render() {
    const { latitude, longitude } = this.props.info.geolocation;
    const { caption } = this.props.info;
    console.log(this.props.navigation);
    return (
      <MapView.Marker
        coordinate={{
          latitude: +latitude,
          longitude: +longitude
        }}
        title={caption ? caption : ""}
        // onCalloutPress={() =>
        //   this.props.navigation.navigate("SingleImageScreen", {
        //     downloadUrl: this.props.info.downloadUrl,
        //     photoId: this.props.key
        //   })
        // }
      />
    );
  }
}
