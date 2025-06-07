import PhoneInput from "react-native-phone-number-input";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";
import Icons from "./Icons";
import { useSelector } from "react-redux";
const CountryPhoneInput = ({
  value = "+1",
  setValue,
  withLabel,
  onEndEditing,
  error,
  showCheck,
  phoneInput,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isDark = useSelector((store) => store?.theme?.isDarkMode);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {withLabel && (
        <CustomText
          label={withLabel}
          fontSize={16}
          fontFamily={fonts.medium}
          marginBottom={8}
        />
      )}
      <PhoneInput
        ref={phoneInput}
        textInputStyle={{
          fontSize: 14,
          fontFamily: fonts.regular,
        }}
        defaultValue={value}
        defaultCode="US"
        layout="first"
        onChangeText={setValue}
        textInputProps={{
          placeholderTextColor: COLORS.gray,
          // maxLength: 12,
          style: [
            styles.phoneInput,
            { flex: 1, backgroundColor: COLORS.black },
          ],
          onFocus: handleFocus,
          onBlur: handleBlur,
          onEndEditing,
        }}
        countryPickerButtonStyle={{ backgroundColor: COLORS.black }}
        codeTextStyle={[styles.phoneInput, { marginLeft: -8 }]}
        containerStyle={[
          styles.phoneInputContainer,
          ,
          {
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.black,
          },
        ]}
        textContainerStyle={[
          styles.textContainerStyle,
          {
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.black,
          },
        ]}
        // onChangeFormattedText={(formattedValue) => setValue(formattedValue)}
      />
      {error && (
        <CustomText label={error} color={COLORS.red} marginBottom={15} />
      )}
      {showCheck && value?.length ? (
        <Icons
          family={error ? "Entypo" : "AntDesign"}
          name={error ? "circle-with-cross" : "checkcircle"}
          size={20}
          color={error ? COLORS.red : COLORS.green}
          style={{ position: "absolute", right: 10, zIndex: 999, top: 15 }}
          onPress={error ? () => setValue("") : false}
        />
      ) : null}
    </View>
  );
};
export default CountryPhoneInput;
const styles = StyleSheet.create({
  phoneInput: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: COLORS.black,
  },
  phoneInputContainer: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  textContainerStyle: {
    borderLeftWidth: 1,
    paddingVertical: 0,
  },
});
