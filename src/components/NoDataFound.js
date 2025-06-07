import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

const NoDataFound = ({ title, marginTop, source, desc }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={[styles.image, { marginTop: marginTop || 80 }]}
        source={source || Images.noShowImage}
      />
      <CustomText
        label={title || "No data found"}
        fontFamily={fonts.semiBold}
        fontSize={18}
        textAlign="center"
        marginTop={5}
        alignSelf={"center"}
      />
      <CustomText
        label={desc}
        fontFamily={fonts.medium}
        textAlign="center"
        marginTop={10}
        color={COLORS.authText}
        lineHeight={25}
        alignSelf={"center"}
      />
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: Dimensions.get("window").width - 40,
    paddingHorizontal: 35,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
});
