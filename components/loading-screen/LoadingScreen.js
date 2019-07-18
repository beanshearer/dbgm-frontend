import React from "react";
import { Text } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth"

export default class LoadingScreen extends React.Component {
    state = {
        username: "",
    }

    render() {
        return <Text>Loading</Text>;
    }

    componentDidMount() {
        let username = ""
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                username = user.displayName
                this.setState({ username })
            } else {
                username = ""
                this.setState({ username })
            }
        })
    }

    componentDidUpdate() {
        const { username } = this.state;
        if (username) {
            this.props.navigation.navigate("NavigationScreen")
        } else {
            this.props.navigation.navigate("SplashScreen")
        }
    }
}
