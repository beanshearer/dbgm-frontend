// In App.js in a new project

import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  CheckBox
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.header}>APP NAME</Text>
        <View>
          <TouchableOpacity
            style={styles.channelsButton}
            title="Channels"
            onPress={() => this.props.navigation.navigate("Channels")}
          >
            <Text style={styles.saveButtonText}>Channels</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.saveButton}
            title="Sign In"
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.saveButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ChannelsScreen extends React.Component {
  state = {
    channels: []
  };
  getChannels = () => {
    return fetch("https://ea862c3d.ngrok.io/channels")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          channels: Object.keys(responseJson)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>CHANNELS</Text>
        {this.state.channels &&
          this.state.channels.map(channel => {
            return (
              <View style={styles.channels}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    this.props.navigation.navigate("ChannelNotifications");
                  }}
                >
                  <Text>{channel}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    );
  }

  componentDidMount() {
    this.getChannels();
  }
}

class ChannelNotificationsScreen extends React.Component {
  state = {};
  render() {
    return (
      <View>
        <Text>Channel Notifications -- need to add the get request here</Text>
      </View>
    );
  }
}

class SingInScreen extends React.Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: ""
  };

  handleNameInput = nameInput => {
    this.setState(prevState => {
      return {
        name: nameInput
      };
    });
  };

  handleUsernameInput = usernameInput => {
    this.setState(prevState => {
      return {
        username: usernameInput
      };
    });
  };

  handleEmailInput = emailInput => {
    this.setState(prevState => {
      return {
        email: emailInput
      };
    });
  };

  handlePasswordInput = passwordInput => {
    this.setState(prevState => {
      return {
        password: passwordInput
      };
    });
  };

  handleSubmit = () => {
    fetch("https://ea862c3d.ngrok.io/channels", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: {
          name: this.state.name,
          username: this.state.username,
          email: this.state.emailInput,
          password: this.state.passwordInput
        }
      })
    });
  };

  render() {
    return (
      <View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="enter name"
            maxLength={40}
            value={this.state.name}
            onChangeText={this.handleNameInput}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="enter username"
            maxLength={40}
            value={this.state.username}
            onChangeText={this.handleUsernameInput}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="enter email address"
            maxLength={40}
            value={this.state.email}
            onChangeText={this.handleEmailInput}
          />
        </View>
        <View>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="enter password"
            maxLength={40}
            value={this.state.password}
            onChangeText={this.handlePasswordInput}
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.handleSubmit}
              onPress={() => this.props.navigation.navigate("SetupChannels")}
            >
              <Text style={styles.saveButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

class SetupChannelsScreen extends React.Component {
  state = {
    channels: [],
    ChannelRadioButton: []
  };

  getChannels = () => {
    return fetch("https://ea862c3d.ngrok.io/channels")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          channels: Object.keys(responseJson)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>CHANNELS</Text>
        {this.state.channels &&
          this.state.channels.map(channel => {
            return (
              <View style={styles.checkBox}>
                <CheckBox
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={this.state.ChannelRadioButton === { channel }}
                  onPress={() =>
                    this.setState({ ChannelRadioButton: { channel } })
                  }
                />
                <Text>{channel}</Text>
              </View>
            );
          })}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.saveButtonText}>Submit Channels</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.getChannels();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  inputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 0
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  checkBox: {
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  channels: {
    fontSize: 25,
    padding: 5
  },
  channelsButton: {
    borderWidth: 1,
    borderColor: "rgb(148,0,211)",
    backgroundColor: "rgb(148,0,211)",
    padding: 15,
    margin: 0
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Channels: ChannelsScreen,
    SignIn: SingInScreen,
    ChannelNotifications: ChannelNotificationsScreen,
    SetupChannels: SetupChannelsScreen
  },
  {
    initialRouteName: "Home"
  },
  {
    ChannelNotifications: ChannelNotificationsScreen
  },
  { initialRouteName: "Details" }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// export default createAppContainer(AppNavigator);
