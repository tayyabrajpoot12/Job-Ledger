import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';

import CustomText from './CustomText';

import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  customText,
  marginBottom,
  marginTop,
  backgroundColor,
  color,
  width = '100%',
  height = 48,
  borderRadius = 8,
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'row',
  alignSelf = 'center',
  fontSize,
  indicatorcolor,
  ImageIcon,
  borderWidth = 0,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: backgroundColor || COLORS.primaryColor,
          marginTop,
          marginBottom,
          width,
          height,
          borderRadius,
          flexDirection,
          alignItems,
          justifyContent,
          alignSelf,
          borderWidth: borderWidth,
          borderColor: borderColor,
        },
        customStyle,
      ]}
      onPress={onPress}>
      {loading && (
        <ActivityIndicator
          size={25}
          color={indicatorcolor ? indicatorcolor : COLORS.white}
        />
      )}
      {!loading && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {ImageIcon && ImageIcon}
          <View>
            <CustomText
              textStyle={customText}
              label={title}
              color={color ? color : '#fff'}
              fontSize={fontSize || 15}
              lineHeight={28}
              fontFamily={fonts.medium}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
