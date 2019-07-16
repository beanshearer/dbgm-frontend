
import React from "react";
import {
    View,
    Text,
    Button
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth"



export default class AccountManagementScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>AccountManagementScreen</Text>
                <Button
                    title="Sign Out"
                    onPress={this.signOut}
                />
            </View>
        );
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate("LoadingScreen")
        }).catch(function (error) {
            // An error happened.
        });
    }
}