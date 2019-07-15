import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from 'react-native-check-box'
import '@expo/vector-icons';


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

    render() {
        const { channel_names } = this.state
        console.log(channel_names)
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>Share to Channels</Text>
                <View style={{ flex: 1, alignItems: 'left', alignSelf: "stretch" }}>
                    {channel_names.map(channel => {
                        return <View
                            key={channel}
                            style={{ flex: 1, borderColor: 'black', borderWidth: 2, borderRadius: 5, alignSelf: "stretch", margin: 5, padding: 15 }}
                        >
                            <CheckBox

                                onClick={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked
                                    })
                                }}
                                isChecked={this.state.isChecked}
                                rightText={channel}
                            /></View>
                    })}
                </View>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: Constants.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//     },
// });