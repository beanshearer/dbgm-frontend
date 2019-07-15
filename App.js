// In App.js in a new project

import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  DisplayRoles
} from "react-native";
import Map from "./Map";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import PhotoScreen from "./PhotoScreen";
import UploadToChannels from "./UploadToChannels";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

class HomeScreen extends React.Component {
  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    return fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: {
          value: token
        },
        user: {
          username: "ladysneezes"
        }
      })
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>HOMEPAGE</Text>
        <Button
          title="Users=Channels"
          onPress={() => this.props.navigation.navigate("Details")}
        />
        <Button
          title="SignIn"
          onPress={() => this.props.navigation.navigate("SignIn")}
        />
        <Button
          title="Map"
          onPress={() => this.props.navigation.navigate("Map")}
        />
        <Button
          title="Camera"
          onPress={() => this.props.navigation.navigate("PhotoScreen")}
        />
      </View>
    );
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }
}

class DetailsScreen extends React.Component {
  state = {
    users: []
  };
  getUSers = () => {
    return fetch("https://ea862c3d.ngrok.io/users")
      .then(response => response.json())
      .then(responseJson => {
        // return responseJson.movies;
        this.setState({
          users: Object.keys(responseJson)
        });
        // console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <Text>CHANNELS</Text>
        {this.state.users &&
          this.state.users.map(user => {
            console.log(user);
            return (
              <View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    this.props.navigation.navigate("ChannelNotifications");
                  }}
                >
                  <Text>{user}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    );
  }

  componentDidMount() {
    this.getUSers();
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
    fetch("https://ea862c3d.ngrok.io/users", {
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
            >
              <Text style={styles.saveButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    SignIn: SingInScreen,
    ChannelNotifications: ChannelNotificationsScreen,
    Map: Map,
    Home: HomeScreen,
    PhotoScreen,
    UploadToChannels
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
