import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import bd from 'rn-bottom-drawer'

class PullUpTab extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={styles.container}>
                <Text>Pull Up Tab:</Text>
                <View>
                    <Image source={pic} style={{width: 110, height: 110}}/>
                    <Text>Impale banana on spiky tree outside bplate</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#96ffcf',
    },
});

export default PullUpTab;
