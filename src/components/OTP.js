import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  useClearByFocusCell,
  useBlurOnFulfill,
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';

import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const CELL_COUNT = 6;

const OTPComponent = ({value, setValue}) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OTPComponent;

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  cellRoot: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    width: 45,
  },
  cellText: {
    color: COLORS.black,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: fonts.regular,
    marginTop: 5,
  },
  focusCell: {
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
});
