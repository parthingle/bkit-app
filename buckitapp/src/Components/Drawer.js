import React, { Component } from "react";
import { PanResponder, Animated, Dimensions, View } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Drawer extends Component {
  static defaultProps = {
    // how far down should the drawer start
    offset: 0,
    // how far from a resting position should
    // cause the drawer to spring to the resting position
    threshold: SCREEN_HEIGHT / 6
  };

  constructor(props) {
    super(props);

    this.topBounds = {
      x: 0,
      y: this.props.offset
    };

    const currentPosition = this.topBounds;

    this.state = {
      y: currentPosition.y,
      y0: currentPosition.y,
      bottomBounds: 0,
      height: this.props.offset
    };

    this.position = new Animated.ValueXY(currentPosition);
    this.position.addListener(({ x, y }) => {
      this.setState({ y });
    });

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) => {
        const dx2 = gesture.dx * gesture.dx;
        const dy2 = gesture.dy * gesture.dy;
        const dh = Math.sqrt(dx2 + dy2);
        return Math.abs(dh) > 0.001;
      },
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease
    });
  }

  componentWillUnmount() {
    this.position.stopAnimation();
    this.position.removeAllListeners();
  }

  render() {
    return (
      <Animated.View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          const bottomBounds = this.topBounds.y - height + this.props.offset;
          this.setState({ bottomBounds, height });
        }}
        style={{
          ...this.position.getLayout(),
          left: 0,
          ...styles.animationContainer(this.state.height),
          ...this.props.style
        }}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
        <View height={10}></View>
      </Animated.View>
    );
  }
  handlePanResponderGrant = (e, gesture) => {
    this.setState({ y0: this.state.y });
  };

  handlePanResponderMove = (e, gesture) => {
    let newY = this.state.y0 + gesture.dy;
    if (newY > this.topBounds.y) {
      newY = this.topBounds.y + Math.sqrt(Math.abs(gesture.dy * 10));
    } else if (newY <= this.state.bottomBounds) {
      newY = this.state.bottomBounds - Math.sqrt(Math.abs(gesture.dy * 10));
    }
    this.setState({ y: newY }, () => {
      this.position.setValue({ y: newY });
    });
  };

  handlePanResponderRelease = (e, gesture) => {
    let newY = this.state.y0 + gesture.dy;
    if (newY >= this.topBounds.y - this.props.threshold) {
      Animated.spring(this.position, {
        toValue: this.topBounds
      }).start();
    } else if (newY <= this.state.bottomBounds) {
      Animated.spring(this.position, {
        toValue: {
          x: 0,
          y: this.state.bottomBounds
        }
      }).start();
    } else {
      Animated.decay(this.position, {
        velocity: { x: 0, y: gesture.vy }
      }).start();
    }
    // if the pan manages to flick the Drawer out of bounds,
    // spring it back into place after a delay
    setTimeout(
      () =>
        this.position.stopAnimation(({ x, y }) => {
          if (y >= this.topBounds.y - this.props.threshold) {
            Animated.spring(this.position, {
              toValue: this.topBounds
            }).start();
          } else if (y <= this.state.bottomBounds) {
            Animated.spring(this.position, {
              toValue: {
                x: 0,
                y: this.state.bottomBounds
              }
            }).start();
          }
        }),
      1000
    );
  };
}

const styles = {
  animationContainer: height => {
    return {
      width: SCREEN_WIDTH,
      minHeight: height,
      position: "absolute"
    };
  }
};

// Animated.spring(this.position, {
//   toValue: {
//     x: 0,
//     y:
//       this.state.y <= this.state.bottomBounds
//         ? this.state.bottomBounds
//         : this.state.y >= this.topBounds.y
//         ? this.topBounds.y
//         : this.state.y
//   }
// });
