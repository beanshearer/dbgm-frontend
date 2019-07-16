import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

export default class RegisterScreen extends React.Component {

    state = {
        name: "",
        username: "",
        email: "",
        password: ""
    };

    handleNameInput = name => {
        this.setState(prevState => {
            return {
                name
            };
        });
    };

    handleUsernameInput = username => {
        this.setState(prevState => {
            return {
                username
            };
        });
    };

    handleEmailInput = email => {
        this.setState(prevState => {
            return {
                email
            };
        });
    };

    handlePasswordInput = password => {
        this.setState(prevState => {
            return {
                password
            };
        });
    };

    handleSubmit = () => {
        console.log('here')
        const { email, password, username } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updateProfile({ displayName: username })
            })
            .then(function () {
                const user = firebase.auth().currentUser;
                console.log('user added', user)
            })
            .catch(function (error) {
                console.log(error.message)
            });
        fetch("https://ea862c3d.ngrok.io/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: {
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }
            })
        });
    };

    render() {
        return (
            <View>
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="enter name"
                        maxLength={40}
                        value={this.state.name}
                        onChangeText={this.handleNameInput}
                    />
                </View>
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
                        placeholder="enter email address"
                        maxLength={40}
                        value={this.state.email}
                        onChangeText={this.handleEmailInput}
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
