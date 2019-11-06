import React, { Component } from "react";
import { PanResponder, Animated, Dimensions } from "react-native";

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

    this.topY = this.props.offset;
    this.bottomY = 0;

    this.pan = new Animated.ValueXY({ x: 0, y: this.topY });
    this.panY = this.topY;
    this.pan.addListener(({ x, y }) => {
      this.panY = y;
    });
    this.panStartY = 0;

    this.state = {
      height: this.topY
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease
    });
  }

  componentWillUnmount() {
    this.pan.stopAnimation();
    this.pan.removeAllListeners();
  }

  render() {
    if (this.topY !== this.props.offset) {
      this.topY = this.props.offset;
      this.pan.setValue({ x: 0, y: this.topY });
    }

    return (
      <Animated.View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          this.bottomY = SCREEN_HEIGHT - height;
          this.setState({ height });
        }}
        style={{
          ...this.pan.getLayout(),
          left: 0,
          width: SCREEN_WIDTH,
          minHeight: SCREEN_HEIGHT - this.props.offset,
          position: "absolute",
          ...this.props.style
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }

  handleMoveShouldSetPanResponder = (e, gesture) => {
    const dx2 = gesture.dx * gesture.dx;
    const dy2 = gesture.dy * gesture.dy;
    const dh = Math.sqrt(dx2 + dy2);
    return Math.abs(dh) > 0.001;
  };

  handlePanResponderGrant = (e, gesture) => {
    this.panStartY = this.panY;
  };

  handlePanResponderMove = (e, gesture) => {
    let panNewY = this.panStartY + gesture.dy;
    if (panNewY > this.topY) {
      panNewY = this.topY + Math.sqrt(Math.abs(gesture.dy * 10));
    } else if (panNewY <= this.bottomY) {
      panNewY = this.bottomY - Math.sqrt(Math.abs(gesture.dy * 10));
    }
    this.pan.setValue({ y: panNewY });
  };

  handlePanResponderRelease = (e, gesture) => {
    let panNewY = this.panStartY + gesture.dy;
    if (panNewY >= this.topY - this.props.threshold) {
      Animated.spring(this.pan, {
        toValue: { x: 0, y: this.topY }
      }).start();
    } else if (panNewY <= this.bottomY) {
      Animated.spring(this.pan, {
        toValue: {
          x: 0,
          y: this.bottomY
        }
      }).start();
    } else {
      Animated.decay(this.pan, {
        velocity: { x: 0, y: gesture.vy }
      }).start();
    }
    // if the pan manages to flick the Drawer out of bounds,
    // spring it back into place after a delay
    setTimeout(
      () =>
        this.pan.stopAnimation(({ x, y }) => {
          if (y >= this.topY - this.props.threshold) {
            Animated.spring(this.pan, {
              toValue: { x: 0, y: this.topY }
            }).start();
          } else if (y <= this.bottomY) {
            Animated.spring(this.pan, {
              toValue: { x: 0, y: this.bottomY }
            }).start();
          }
        }),
      1000
    );
  };
}
