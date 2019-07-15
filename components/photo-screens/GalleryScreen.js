import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FileSystem, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import config from "../../config";

import * as firebase from "firebase/app";
import "firebase/storage";

firebase.initializeApp(config);
const storage = firebase.storage();
const storageRef = storage.ref("images");
const CURRENT_PHOTO = FileSystem.documentDirectory + 'photos';

export default class GalleryScreen extends React.Component {
    state = {
        photo: null,
        selected: [],
    };

    componentDidMount = async () => {
        const photos = await FileSystem.readDirectoryAsync(CURRENT_PHOTO);
        this.setState({ photo: photos[photos.indexOf('current-photo.jpg')] });
    };

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

    renderPhoto = fileName =>
        <Photo
            key={fileName}
            uri={`${CURRENT_PHOTO}/${fileName}`}
        />;

    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <View
                    style={styles.pictures}
                >
                    {this.renderPhoto(this.state.photo)}
                </View>
                <TouchableOpacity style={styles.leftButton} onPress={this.props.onPress}>
                    <MaterialIcons name="arrow-back" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightButton} onPress={() => this.props.navigation.navigate('UploadToChannels')}>
                    <Text style={styles.whiteText}>Share</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },
    rightButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 20,
    },
    leftButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 20,
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#4630EB',
    },
    pictures: {
        flex: 1,
    },
    whiteText: {
        color: 'white',
    }
});
