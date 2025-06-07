import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';
export default function Error({error, visible}) {
  if (!visible || !error) {
    return null;
  }
  return (
    <View>
      <CustomText
        label={error}
        color={COLORS.red}
        fontSize={12}
        marginBottom={10}
      />
    </View>
  );
}
