import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';

const AuthWrapper = ({
  children,
  scrollEnabled = false,
  heading = '',
  desc = '',
  marginBottom,
}) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled={scrollEnabled}
      style={{flex: 1}}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <CustomText label={heading} fontSize={18} color={COLORS.black} />
      <CustomText
        label={desc}
        color={COLORS.gray1}
        marginBottom={marginBottom || 20}
      />

      {children}
    </KeyboardAwareScrollView>
  );
};

export default AuthWrapper;
