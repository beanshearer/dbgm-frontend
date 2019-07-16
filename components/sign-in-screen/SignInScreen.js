import React from "react";
React.createContext('light');
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

export default class SignInScreen extends React.Component {
    state = {
        email: "",
        password: ""
    };

    handleUsernameInput = email => {
        this.setState({ email });
    };

    handlePasswordInput = password => {
        this.setState({ password });
    };

    handleSubmit = () => {
        const { email, password } = this.state;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => { console.log(res) })
            .catch(function (error) {
                console.log(error.code);
            });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('User is signed in.')
            } else {
                console.log('User is signed out')
            }
        });
    };

    render() {
        return (
            <View>
                <Image source={require('../../logos/logo-transparent-background.png')} />
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="enter username"
                        maxLength={40}
                        value={this.state.username}
                        onChangeText={this.handleUsernameInput}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="enter password"
                        maxLength={40}
                        value={this.state.password}
                        onChangeText={this.handlePasswordInput}
                    />
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={this.handleSubmit}
                        >
                            <Text style={styles.saveButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
