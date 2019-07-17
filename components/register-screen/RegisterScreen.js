import React from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
    View,
    Image
} from 'react-native';
import * as firebase from "firebase/app";
import "firebase/auth";

export default class RegisterScreen extends React.Component {
    state = {
        name: '',
        username: '',
        email: '',
        password: ''
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text>HI</Text>,
            headerRight: (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CaptureScreen') }}>
                        <Image source={require('../../buttons/camera.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
                        <Image source={require('../../buttons/home.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
            ),
        };
    };


    handleSubmit = () => {
        const { email, password, username, name } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updateProfile({ displayName: username })
                return fetch("https://ea862c3d.ngrok.io/users", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, username, email, password,
                        avatar: "null",
                        subscribed_channels: '[]',
                        geolocation: "null",
                        notifications: "null",
                        token: "null"
                    })
                })
            })
            .then(() => {
                console.log('user added')
                this.props.navigation.navigate('AllChannels')
            })
            .catch(function (error) {
                console.log(error.message)
            });
    };

    render() {
        const { name, password, username, email } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.header}>Register</Text>
                <TextInput
                    style={styles.textInput}
                    maxLength={40}
                    returnKeyLabel="next"
                    placeholder="Name"
                    onChangeText={name => this.setState({ name })}
                    value={name}
                    underlineColorAndroid={'transparent'}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyLabel="next"
                    maxLength={40}
                    placeholder="Username"
                    onChangeText={username => this.setState({ username })}
                    value={username}
                    underlineColorAndroid={'transparent'}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyLabel="next"
                    maxLength={40}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({ email })}
                    value={email}
                    underlineColorAndroid={'transparent'}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyLabel="go"
                    maxLength={40}
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={password}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.btntext}>SIGN UP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#CA7E8D',
        paddingLeft: 60,
        paddingRight: 60
    },
    regform: {
        alignSelf: 'stretch'
    },
    header: {
        fontSize: 25,
        color: 'white',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        padding: 10,
        marginBottom: 10,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E6B655',
        marginTop: 20,
        marginBottom: 90
    },
    btntext: {
        color: 'white',
        fontWeight: 'bold'
    }
});
