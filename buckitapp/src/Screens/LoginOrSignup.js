//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class LoginOrSignup extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>LoginOrSignup</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

//make this component available to the app
export default LoginOrSignup;
