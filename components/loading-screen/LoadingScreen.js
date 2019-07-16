import React from "react";
import { Text } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth"

export default class LoadingScreen extends React.Component {
    state = {
        username: "",
    }

    render() {
        const { username } = this.state
        console.log(username)
        return <Text>Loading</Text>;
    }

    componentDidMount() {
        let username = null
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                username = user.displayName
                this.setState({ username })
            } else {
                username = null
                this.setState({ username })
            }
        })
    }

    componentDidUpdate() {
        const { username } = this.state;
        if (username) {
            this.props.navigation.navigate("NavigationScreen")
        } else {
            this.props.navigation.navigate("SignInScreen")
        }
    }
}
