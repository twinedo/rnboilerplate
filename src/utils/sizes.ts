import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const height = screenHeight < screenWidth ? screenWidth : screenHeight;
const width = screenWidth < screenHeight ? screenWidth : screenHeight;

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 680;

function percentageWidth(percent: number): number {
  return width * (percent / 100);
}

function percentageHeight(percent: number): number {
  return height * (percent / 100);
}

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = ({size, factor = 0.5}: {size: number; factor?: number}) =>
  size + (horizontalScale(size) - size) * factor;

export {
  percentageHeight,
  percentageWidth,
  horizontalScale,
  verticalScale,
  moderateScale,
};
