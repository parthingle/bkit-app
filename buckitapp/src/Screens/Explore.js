//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class Explore extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Explore</Text>
                <Button
                    title="Go to Loading"
                    onPress={() => this.props.navigation.navigate("Loading")}
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
export default Explore;
