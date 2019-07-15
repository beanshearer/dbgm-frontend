
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
                    title="SignInScreen"
                    onPress={() => this.props.navigation.navigate("SignInScreen")}
                />
                <Button
                    title="AllChannels"
                    onPress={() => this.props.navigation.navigate("AllChannels")}
                />
                <Button
                    title="RegisterScreen"
                    onPress={() => this.props.navigation.navigate("RegisterScreen")}
                />
                <Button
                    title="MapScreen"
                    onPress={() => this.props.navigation.navigate("MapScreen")}
                />
                <Button
                    title="PhotoScreen"
                    onPress={() => this.props.navigation.navigate('PhotoScreen')}
                />
            </View>
        );
    }
}