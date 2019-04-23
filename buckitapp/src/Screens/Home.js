import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PullUpTab from "./List/PullUpTab";

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
