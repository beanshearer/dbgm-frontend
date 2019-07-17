
import React from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth"



export default class AccountManagementScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text>ACCOUNT</Text>,
            headerLeft: (
                <TouchableOpacity onPress={() => { navigation.navigate('AllChannels') }}>
                    <Image source={require('../../logos/logo-transparent-background.png')} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
                        <Image source={require('../../buttons/home.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('CaptureScreen') }}>
                        <Image source={require('../../buttons/camera.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
            ),
        };
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button
                    title="Sign Out"
                    onPress={this.signOut}
                />
                <Button
                    title="NavigationScreen"
                    onPress={() => this.props.navigation.navigate('NavigationScreen')}
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