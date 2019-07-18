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

export default class HomeScreen extends React.Component {

  state = { images: [], image_id: [] };

  componentDidMount() {
    this.getImages();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>HOME</Text>,
      headerLeft: (
        <TouchableOpacity onPress={() => { navigation.navigate('AllChannels') }}>
          <Image source={require('../../logos/logo-transparent-background.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('AccountManagementScreen') }}>
            <Image source={require('../../buttons/account-info.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('CaptureScreen') }}>
            <Image source={require('../../buttons/camera.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  render() {
    const { images } = this.state;

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
        {this.state.images &&
          images.map(image => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SingleImageScreen', {
                    imgId: image.id, downloadUrl: image.event_img
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
                    subtitle={image.relevant_channels}
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

  getImages = () => {
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#F5FCFF'
  },
  card: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginLeft: '2%',
    width: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: 500,
    height: 500
  },
  cardText: {
    fontSize: 15,
    padding: 10
  }
});
