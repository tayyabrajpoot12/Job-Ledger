import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import { useSelector } from "react-redux";

const TextSpaceBetween = ({
  leftText,
  leftImage,
  rightText,
  light,
  marginTop,
  rightColor,
  rightImage,
  customStyle,
  other,
  onPress,
}) => {
  const isDark = useSelector((store) => store?.theme?.isDarkMode);
  return (
    <View style={[styles.container, customStyle, { marginTop: marginTop }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {leftImage && <Image source={leftImage} style={styles.leftImage} />}
        <CustomText label={leftText} fontSize={13} color={COLORS.white} />
        {other && (
          <CustomText
            label={4}
            fontSize={20}
            fontFamily={fonts.semiBold}
            marginLeft={4}
            color={COLORS.white}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {rightImage && <Image source={rightImage} style={styles.leftImage} />}
        <CustomText
          label={rightText}
          numberOfLines={1}
          alignSelf={"flex-end"}
          color={rightColor}
          textTransform={"capitalize"}
          color={COLORS.white}
          fontSize={13}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default TextSpaceBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  leftImage: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
});
