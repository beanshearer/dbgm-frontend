import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from 'react-native-check-box'
import '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from "firebase/app";
import "firebase/storage";

const storage = firebase.storage();
const storageRef = storage.ref("images");

export default class UploadToChannels extends React.Component {
    state = {
        isChecked: false,
        channels: {},
        channel_names: []
    }

    componentDidMount = () => {
        return fetch('https://ea862c3d.ngrok.io/channels')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ channels: responseJson, channel_names: Object.keys(responseJson) });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    saveToGallery = async () => {
        const { photo } = this.state;
        const photoUri = CURRENT_PHOTO + "/" + photo
        if (photo.length > 0) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                throw new Error('Denied CAMERA_ROLL permissions!');
            }

            const promise = MediaLibrary.createAssetAsync(photoUri);

            let response = await fetch(photoUri)
            const blob = await response.blob()
            promise.then(() => {
                const spaceRef = storageRef.child(JSON.stringify(promise['_55']['creationTime']));
                spaceRef.put(blob).then(function (snapshot) {
                    console.log('Uploaded a blob or file!');
                });
            })

            alert('Successfully shared!');
        }
    };

    render() {
        const { channel_names } = this.state
        console.log(channel_names)
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text>Share to Channels</Text>
                <View style={{ flex: 1, alignItems: 'left', alignSelf: "stretch" }}>
                    {channel_names.map(channel => {
                        return <View
                            key={channel}
                            style={{ flex: 1, alignSelf: "stretch", margin: 5 }}
                        ><LinearGradient
                            colors={['#ADDDCE', '#E6B655']}
                            style={{ flex: 1, alignSelf: "stretch", borderRadius: 5, padding: 15 }}
                        >
                                <CheckBox

                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    isChecked={this.state.isChecked}
                                    rightText={channel}
                                /></LinearGradient>
                        </View>
                    })}
                </View>
            </View >
        );
    }
}