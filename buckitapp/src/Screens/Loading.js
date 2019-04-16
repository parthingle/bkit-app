//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <Text>Check local storage for token;</Text>
                <Text>forward to "App" if token is present;</Text>
                <Text>"Auth" otherwise</Text>
                <Button
                    title="Go to Auth"
                    onPress={() => this.props.navigation.navigate("Auth")}
                />
                <Button
                    title="Go to App"
                    onPress={() => this.props.navigation.navigate("App")}
                />
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
export default Loading;
