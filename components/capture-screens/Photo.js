import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class Photo extends React.Component {
    state = {
        selected: false,
        image: null,
    };
    _mounted = false;

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getImageDimensions = ({ width, height }) => {
        if (width > height) {
            const scaledHeight = pictureSize * height / width;
            return {
                width: pictureSize,
                height: scaledHeight,

                scaleX: pictureSize / width,
                scaleY: scaledHeight / height,

                offsetX: 0,
                offsetY: (pictureSize - scaledHeight) / 2,
            };
        } else {
            const scaledWidth = pictureSize * width / height;
            return {
                width: scaledWidth,
                height: pictureSize,

                scaleX: scaledWidth / width,
                scaleY: pictureSize / height,

                offsetX: (pictureSize - scaledWidth) / 2,
                offsetY: 0,
            };
        }
    };

    render() {
        const { uri } = this.props;
        return (
            <Image
                style={styles.picture}
                source={{ uri }}
            />
        );
    };
}

const styles = StyleSheet.create({
    picture: {
        flex: 1,
    },
    pictureWrapper: {
        flex: 1,
    }
});