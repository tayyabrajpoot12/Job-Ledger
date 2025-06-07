import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

import { useSelector } from "react-redux";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";

const PhoneNumberInput = ({
  value,
  defaultValue,
  phoneInput,
  error,
  onChangeFormattedText = () => "",
  onChangeText = () => "",
  defaultCode,
  disabled = false,
  onBlur,
}) => {
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";

  const ref = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const isDark = useSelector((store) => store?.theme?.isDarkMode);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          marginBottom: isError ? 2 : 15,
        },
      ]}
    >
      <PhoneInput
        ref={phoneInput}
        defaultValue={defaultValue}
        value={value}
        defaultCode={defaultCode || "US"}
        layout="first"
        disabled={disabled}
        withDarkTheme={isDark}
        placeholder={"Enter your number"}
        textInputProps={{
          onFocus: handleFocus,
          onBlur: handleBlur,
          placeholderTextColor: COLORS.placeHolder,
          fontFamily: fonts.regular,
        }}
        containerStyle={[
          styles.containerStyle,
          {
            borderColor: COLORS.gray1,
            backgroundColor: COLORS.black,
          },
        ]}
        textContainerStyle={[
          styles.textContainerStyle,
          {
            borderColor: COLORS.gray1,
            backgroundColor: COLORS.black,
          },
        ]}
        textInputStyle={[styles.textInputStyle, { color: COLORS.white }]}
        codeTextStyle={[styles.codeTextStyle, { color: COLORS.white }]}
        onChangeText={onChangeText}
        countryPickerButtonStyle={[
          styles.countryPickerButtonStyle,
          { backgroundColor: COLORS.black },
        ]}
        onChangeFormattedText={onChangeFormattedText}
        countryPickerProps={{ withAlphaFilter: false }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
  },

  error: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: COLORS.white,
    marginTop: 3,
  },
  containerStyle: {
    backgroundColor: COLORS.black,
    width: "100%",
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray1,
  },
  textContainerStyle: {
    backgroundColor: COLORS.black,
    borderLeftWidth: 1,
    borderColor: COLORS.gray1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  textInputStyle: {
    fontFamily: fonts.medium,
    height: 56,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  codeTextStyle: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: COLORS.white,
    top: -3,
  },
  countryPickerButtonStyle: {
    borderRightColor: COLORS.gray1,
    alignSelf: "center",
    backgroundColor: COLORS.black,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default PhoneNumberInput;
