import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as firebase from "firebase/app";
import "firebase/auth"

export default class AllChannels extends React.Component {
    state = {
        username: "",
        loggedUser: {},
        channels: {},
        channel_names: [],
        chosen: {},
        selected_channels: [],
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text>CHANNELS</Text>,
            headerLeft: (
                <Image source={require('../../logos/logo-transparent-background.png')} style={{ width: 40, height: 40 }} />
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

    getChannel = () => {
        return fetch('https://ea862c3d.ngrok.io/channels')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    channels: responseJson,
                    channel_names: Object.keys(responseJson)
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    getUserByUsername = (username) => {
        if (this.props.navigation.state.params.newuser)
            return fetch(`https://ea862c3d.ngrok.io/users/${username}`)
                .then(response => {
                    if (response) {
                        return response.json()
                    }
                })
                .then(loggedUser => {
                    this.setState({ loggedUser });
                    return loggedUser
                }).then(loggedUser => {
                    let channels = ""
                    if (loggedUser.subscribed_channels.length > 0) {
                        channels = JSON.parse(loggedUser.subscribed_channels)
                        channels.map(channel => {
                            this.setState({
                                chosen: { ...this.state.chosen, [channel]: true }
                            })
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                });
    };

    onClick = (channel) => {
        const { chosen } = this.state;
        if (!chosen[channel]) {
            return this.setState({
                chosen: { ...chosen, [channel]: true }
            })
        } else
            this.setState({
                chosen: { ...chosen, [channel]: false }
            });
    }

    render() {
        const { channel_names, loggedUser } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#ADDDCE" }}>
                <Text
                    style={{ alignSelf: "stretch", margin: 5, padding: 5 }}
                >{loggedUser.name} - Subscribed Channels</Text>
                <ScrollView style={{ flex: 1, alignSelf: "stretch" }}>
                    {channel_names.map(channel => {
                        return <View
                            key={channel}
                            style={{ flex: 1, alignSelf: "stretch", flexDirection: "row", margin: 5, padding: 15, backgroundColor: "#E6B655", borderRadius: 5 }}
                        >
                            <CheckBox
                                onClick={() => this.onClick(channel)}
                                isChecked={this.state.chosen[channel]}
                            />
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SingleChannelScreen', { channel }) }}>
                                <Text style={{ paddingLeft: 10 }} >{channel}</Text>
                            </TouchableOpacity>
                        </View>
                    })}
                </ScrollView>
            </View >
        );
    }

    componentDidMount() {
        this.getChannel();
        let username = ""
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                username = user.displayName
                this.setState({ username })
                this.getUserByUsername(username)
            } else {
                this.setState({ username: "" })
            }
        })
    }

    componentDidUpdate() {
        if (this.props.navigation.state.params.newuser) {
            const { chosen, loggedUser } = this.state;
            const keys = Object.keys(chosen)
            const subscribedChannels = keys.filter(channel => {
                return chosen[channel] === true
            })
            const { subscribed_channels, ...restOfUser } = loggedUser
            const updatedUser = { ...restOfUser, subscribed_channels: JSON.stringify(subscribedChannels) }
            console.log(updatedUser)
            return fetch("https://ea862c3d.ngrok.io/users", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            }).catch(err => { console.log(err) })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: "stretch"
    }
});
