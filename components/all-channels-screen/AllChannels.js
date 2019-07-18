import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box'
import * as firebase from "firebase/app";
import "firebase/auth"
import { LinearGradient } from "expo-linear-gradient";
import ChannelPicture from './ChannelPicture';

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
        if (this.props.navigation.state.params) {
            this.setState({ loggedUser: this.props.navigation.state.params.user });
        } else {
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
        }
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
            <LinearGradient
                colors={['#ca7e8d', '#a66673']}
                style={{ flex: 1, alignItems: 'center' }}>
                <Text
                    style={{ alignSelf: "stretch", margin: 5, padding: 5 }}
                >{loggedUser.name} - Subscribed Channels</Text>
                <ScrollView style={{ flex: 1, alignSelf: "stretch" }}>
                    {channel_names.map(channel => {
                        return <LinearGradient
                            colors={['#e6b655', '#d2b16e']}
                            key={channel}
                            style={{ flex: 1, alignSelf: "stretch", flexDirection: "row", margin: 5, padding: 15, borderRadius: 5 }}
                        >
                            <CheckBox
                                onClick={() => this.onClick(channel)}
                                isChecked={this.state.chosen[channel]}
                            />
                            <TouchableOpacity style={{ paddingLeft: 10, flex: 2 }} onPress={() => { this.props.navigation.navigate('SingleChannelScreen', { channel }) }}>
                                <Text>{channel}</Text>
                            </TouchableOpacity>
                            <ChannelPicture channel={channel} />
                        </LinearGradient>
                    })}
                </ScrollView>
            </LinearGradient >
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
        const { chosen, loggedUser } = this.state;
        const keys = Object.keys(chosen)
        const subscribedChannels = keys.filter(channel => {
            return chosen[channel] === true
        })
        const { subscribed_channels, ...restOfUser } = loggedUser
        const updatedUser = { ...restOfUser, subscribed_channels: JSON.stringify(subscribedChannels) }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: "stretch"
    }
});
