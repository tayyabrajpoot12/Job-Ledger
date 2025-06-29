import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';
import Icons from './Icons';

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  multiline,
  maxLength,
  placeholderTextColor,
  editable = true,
  textAlignVertical,
  marginBottom,
  autoCapitalize,
  error,
  isFocus,
  isBlur,
  width,
  onEndEditing,
  autoFocus,
  ref,
  searchIcon,
  borderRadius,
  marginTop,
  withLabel,
  onMail,
  onBlur,
  backgroundColor,
  color = COLORS.black,
}) => {
  const isError =
    error !== undefined && error !== null && error !== true && error !== '';

  const [hidePass, setHidePass] = useState(true);

  const handleFocus = () => {
    isFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
    isBlur?.();
  };

  return (
    <>
      {withLabel && (
        <CustomText
          label={withLabel}
          marginBottom={5}
          fontSize={14}
          color={'#717579'}
        />
      )}
      <View
        style={[
          styles.mainContainer,
          {
            marginBottom: isError ? 5 : marginBottom || 20,
            marginTop,
            borderColor: COLORS.lightGray,
            height: multiline ? 117 : 56,
            width: width || '100%',
            borderRadius: borderRadius || 8,
            backgroundColor: backgroundColor || COLORS.white,
          },
        ]}>
        {searchIcon && (
          <Icons
            family="Feather"
            name="search"
            size={20}
            color={COLORS.authText}
          />
        )}

        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={[
            styles.input,
            {
              width: secureTextEntry ? '92%' : '98%',
              paddingVertical: multiline ? 10 : 0,
              paddingHorizontal: searchIcon || onMail ? 10 : 0,
              color: color,
            },
          ]}
          secureTextEntry={secureTextEntry ? (hidePass ? true : false) : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          onEndEditing={onEndEditing}
          maxLength={maxLength}
          placeholderTextColor={placeholderTextColor || COLORS.placeHolder}
          editable={editable}
          textAlignVertical={multiline ? 'top' : textAlignVertical}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          cursorColor={COLORS.black}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHidePass(!hidePass)}>
            <Icons
              size={20}
              family="Octicons"
              color={COLORS.gray}
              name={!hidePass ? 'eye' : 'eye-closed'}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  input: {
    height: '100%',
    padding: 0,
    margin: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    flex: 1,
  },
  icon: {
    width: '8%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
