import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
import PullUpTab from "./List/PullUpTab";

const { width, height } = Dimensions.get('window')

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home Page!</Text>
                <PullUpTab></PullUpTab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default Home;
