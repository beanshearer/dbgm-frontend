
import React from "react";
import {
    View,
    Image
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth"

export default class ChannelPicture extends React.Component {

    state = {
        channel_picture: null
    }

    render() {
        const { channel_picture } = this.state
        return (
            <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}>
                {channel_picture && <Image
                    source={{
                        uri: channel_picture
                    }}
                    style={{ paddingLeft: 50, width: 50, height: 50, borderRadius: 26 }}
                />}
            </View>
        );
    }

    componentDidMount() {
        const { channel } = this.props
        return fetch(`https://ea862c3d.ngrok.io/channels/${channel}`)
            .then(response => response.json())
            .then(({ channel_picture }) => {
                this.setState({ channel_picture })
            })
            .catch(err => { console.log(err) })

    }

}