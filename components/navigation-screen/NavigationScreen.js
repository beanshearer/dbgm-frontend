import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default class NavigationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>NavigationScreen</Text>
        <Image
          source={require('../../logos/logo-transparent-background.png')}
        />
        <Button
          title="SignInScreen"
          onPress={() => this.props.navigation.navigate('SignInScreen')}
        />
        <Button
          title="SingleImageScreen"
          onPress={() => this.props.navigation.navigate('SingleImageScreen')}
        />
        <Button
          title="HomeScreen"
          onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
        <Button
          title="AllChannels"
          onPress={() => this.props.navigation.navigate('AllChannels')}
        />
        <Button
          title="SingleChannelScreen"
          onPress={() => this.props.navigation.navigate('SingleChannelScreen')}
        />
        <Button
          title="RegisterScreen"
          onPress={() => this.props.navigation.navigate('RegisterScreen')}
        />
        <Button
          title="MapScreen"
          onPress={() => this.props.navigation.navigate('MapScreen')}
        />
        <Button
          title="CaptureScreen"
          onPress={() => this.props.navigation.navigate('CaptureScreen')}
        />
        <Button
          title="AccountManagementScreen"
          onPress={() =>
            this.props.navigation.navigate('AccountManagementScreen')
          }
        />
        <Button
          title="SplashScreen"
          onPress={() => this.props.navigation.navigate('SplashScreen')}
        />
      </View>
    );
  }
}
