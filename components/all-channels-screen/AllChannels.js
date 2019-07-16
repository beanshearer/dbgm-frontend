import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox
} from "react-native";

export default class AllChannels extends React.Component {
  state = {
    channels: {},
    users: [],
    loggedUser: {},
    channel_names: [],
    chosen: {}
  };
  getChannels = () => {
    return fetch("https://ea862c3d.ngrok.io/channels")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          channels: responseJson,
          channels_names: Object.keys(responseJson)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  getUserByUsername = () => {
    return fetch("https://ea862c3d.ngrok.io/users/gloria07")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loggedUser: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const channels = Object.keys(this.state.channels);
    console.log(this.state.chosen, "chosen");
    console.log(this.state.loggedUser.subscribed_channels, "userChannels");
    return (
      <View style={styles.container}>
        <Text>CHANNELS</Text>
        {this.state.channels &&
          channels.map(channel => {
            return (
              <View>
                {/* <Text>{channel}</Text> */}
                <View>
                  <CheckBox
                    // title={channel}
                    value={this.state.chosen[channel]}
                    onValueChange={() => {
                      if (!this.state.chosen[channel]) {
                        this.setState({
                          chosen: { ...this.state.chosen, [channel]: true },
                          loggedUser: {
                            subscribed_channels: [
                              this.state.loggedUser.subscribed_channels,
                              channel
                            ]
                          }
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
      </View>
    );
  }

  //   componentDidUpdate() {
  //       const {chosen} = this.state;
  //   }

  componentDidMount() {
    this.getChannels();
    this.getUserByUsername();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});
