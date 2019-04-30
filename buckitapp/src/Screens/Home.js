import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';

const { width, height } = Dimensions.get('window')
const TAB_BAR_HEIGHT = 49;
const HEADER_HEIGHT = 60;


class Home extends Component {
  renderContent = () => {
    // let pic = {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    // };
    // return(
    //   <ScrollView horizontal={true}>
    //     <TouchableOpacity>
    //       <View style={styles.bottomdrawer}>
    //         <Text>Pull Up Tab:</Text>
    //         {/* <View>
    //           <Image source={pic} style={{width: 110, height: 110}}/>
    //           <Text>Impale banana on spiky tree outside bplate</Text>
    //         </View> */}
    //       </View>
    //       <View style={styles.date}><Text>Today</Text></View>
    //       <View style={styles.date}><Text>Today</Text></View>
    //       <View style={styles.date}><Text>Today</Text></View>
    //       <View style={styles.date}><Text>Today</Text></View>
    //       <View style={styles.date}><Text>Today</Text></View>
    //       <View style={styles.date}><Text>Today</Text></View>
    //     </TouchableOpacity>
    //   </ScrollView>
    // )
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Get directions to your location</Text>
        <View style={styles.buttonContainer}>
          <Button title="first button" />
          <Button title="second button" />
        </View>
      </View>
    )
  }
  render() {
    return (
      <View>
        <Text>Home Page!</Text>
        <BottomDrawer
          containerHeight={height}
          downDisplay={height/2}
          backgroundColor={'#F9F9F9'}
          offset={TAB_BAR_HEIGHT + HEADER_HEIGHT}
          onExpanded = {() => {console.log('expanded')}}
          onCollapsed = {() => {console.log('collapsed')}}
          startUp={false}
        >
          {this.renderContent()}
        </BottomDrawer>
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
  bottomdrawer: {
    backgroundColor: '#F5FCAA'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 5
  }
});

export default Home;
