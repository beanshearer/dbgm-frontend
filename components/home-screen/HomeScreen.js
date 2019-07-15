
import React from "react";
import {
    View,
    Text,
    Button,
    Image
} from "react-native";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>HOMEPAGE</Text>
                <Image source={require('../../logos/logo-transparent-background.png')} />
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
                    title="Take a photo!"
                    onPress={() => this.props.navigation.navigate('PhotoScreen')}
                />
            </View>
        );
    }
}