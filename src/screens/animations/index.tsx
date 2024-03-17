import {StyleSheet, Text, TextProps, TextStyle, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import globalStyles from 'styles/globalStyles';
import {Button, Spacer} from 'components/atoms';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function Animations() {
  const height = useSharedValue(100);

  const [show, setShow] = useState(false);
  const [heightC, setHeightC] = useState(0);

  const handlePress = () => {
    setShow(!show);
    if (show) {
      height.value = withSpring(50);
    } else {
      height.value = withSpring(heightC + 160);
    }
    // please add here
  };

  return (
    <View
      style={[
        globalStyles.displayFlex,
        // globalStyles.justifyCenter,
        globalStyles.alignCenter,
      ]}>
      <Animated.View
        style={{
          width: 100,
          height,
          backgroundColor: 'violet',
          borderRadius: 20,
          overflow: 'hidden',
          alignSelf: 'center',
        }}>
        <Button onPress={handlePress} textColor="white">
          Title
        </Button>
        <Spacer height={10} />
        <View style={{padding: 4}}>
          <Text onLayout={event => setHeightC(event.nativeEvent.layout.height)}>
            Descritiawdakwn awkdnawd kajdnak dkjawndka wdkjanwd akjwdnak
            dwkjawnd
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({});
