import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';

const CustomText = ({
  textStyle,
  fontSize,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  alignSelf,
  fontFamily,
  fontStyle,
  textTransform,
  textAlign,
  label,
  color,
  fontWeight,
  bottom,
  width,
  borderColor,
  borderBottomWidth,
  onPress,
  marginVertical,
  paddingBottom,
  textDecorationLine,
  lineHeight,
  right,
  left,
  numberOfLines,
  children,
  letterSpacing,
}) => {
  const {t} = useTranslation();
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        {
          fontSize: fontSize || 14,
          color: color || COLORS.black,
          marginTop: marginTop || 0,
          marginBottom: marginBottom || 0,
          marginLeft: marginLeft || 0,
          marginRight: marginRight || 0,
          alignSelf: alignSelf || 'flex-start',
          fontFamily: fontFamily || fonts.regular,
          fontStyle: fontStyle,
          lineHeight: lineHeight,
          letterSpacing: letterSpacing || 0,
          textAlign: textAlign,
          textTransform: textTransform,
          fontWeight: fontWeight,
          bottom: bottom,
          borderBottomWidth: borderBottomWidth,
          borderColor: borderColor,
          width: width,
          marginVertical: marginVertical,
          paddingBottom: paddingBottom,
          right: right,
          left: left,
          textDecorationLine: textDecorationLine || 'none',
        },
        textStyle,
      ]}>
      {t(label)}
      {children}
    </Text>
  );
};
export default CustomText;
