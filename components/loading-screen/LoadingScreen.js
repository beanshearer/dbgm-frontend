import React from "react";
import { Text, Image, View } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth"

export default class LoadingScreen extends React.Component {
    state = {
        username: "",
    }

    render() {
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#ADDDCE" }}>
            <Image
                source={require('../../logos/logo-transparent-background.png')}
            />
            <Text>Loading...</Text>
        </View>)
    }

    componentDidMount() {
        let username = ""
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                username = user.displayName
                this.setState({ username })
            } else {
                this.setState({ username: "" })
            }
        })
    }

    componentDidUpdate() {
        const { username } = this.state;
        if (username) {
            this.props.navigation.navigate("HomeScreen")
        } else {
            this.props.navigation.navigate("SplashScreen")
        }
    }
}
