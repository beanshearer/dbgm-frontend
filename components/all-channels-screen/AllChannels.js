import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default class AllChannels extends React.Component {
    state = {
        users: []
    };
    getUSers = () => {
        return fetch("https://ea862c3d.ngrok.io/channels")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    users: Object.keys(responseJson)
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>CHANNELS</Text>
                {this.state.users &&
                    this.state.users.map(user => {
                        console.log(user);
                        return (
                            <View>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => {
                                        this.props.navigation.navigate("ChannelNotifications");
                                    }}
                                >
                                    <Text>{user}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
            </View>
        );
    }

    componentDidMount() {
        this.getUSers();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: "#F5FCFF"
    },
    header: {
        fontSize: 25,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    inputContainer: {
        paddingTop: 15
    },
    textInput: {
        borderColor: "#CCCCCC",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    saveButton: {
        borderWidth: 1,
        borderColor: "#007BFF",
        backgroundColor: "#007BFF",
        padding: 15,
        margin: 5
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: "center"
    }
});