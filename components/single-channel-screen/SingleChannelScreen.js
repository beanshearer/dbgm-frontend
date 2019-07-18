import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Card,
    CardTitle,
    CardContent,
    CardAction,
    CardButton,
    CardImage
} from 'react-native-material-cards';

export default class SingleChannelScreen extends React.Component {

    state = { images: [], image_id: [] };

    static navigationOptions = ({ navigation }) => {
        const { channel } = navigation.state.params
        return {
            headerTitle: <Text>{channel}</Text>,
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

    render() {
        const { channel } = this.props.navigation.state.params
        const { images } = this.state;
        console.log(images)
        const channelImages = images.filter(image => {
            return image['relevant_channels'][0] = channel
        })
        console.log(channelImages)
        return (
            <ScrollView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    position: 'relative',
                    alignContent: 'space-between',
                    flexWrap: 'wrap',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 10,
                    paddingBottom: 20,
                    backgroundColor: '#F4F6F4'
                }}
            >
                {channelImages &&
                    channelImages.map(image => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('SingleImageScreen', {
                                        imgId: image.id
                                    })
                                }
                                key={image.id}
                            >
                                <Card
                                    style={{ flex: 1, alignContent: "center" }}
                                >
                                    <Image
                                        source={{ uri: image.event_img }}
                                        title=""
                                        style={{
                                            height: 450,
                                            width: 270,
                                            paddingLeft: 50,
                                            paddingRight: 50
                                        }}
                                    />
                                    <CardTitle
                                        title={image.username}
                                        subtitle={image.relevant_channels[0]}
                                        style={{ fontSize: 15, fontWeight: 'bold' }}
                                    />
                                    <CardContent text={image.caption} />
                                    <CardAction separator={true} inColumn={false}>
                                        <CardButton onPress={() => { }} title="" color="blue" />
                                    </CardAction>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
            </ScrollView>
        );
    }

    componentDidMount() {
        return fetch('https://ea862c3d.ngrok.io/images')
            .then(response => response.json())
            .then(responseJson => {
                let myImage = Object.values(responseJson);
                let myImage_id = Object.keys(responseJson);
                this.setState({
                    images: myImage,
                    image_id: myImage_id
                });
            })
            .catch(error => {
                console.error(error);
            });
    };
}