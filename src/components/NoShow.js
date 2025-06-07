import { StyleSheet, Image, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { Images } from "../assets/images";

const NoShow = ({ label, label2, marginTop }) => {
  return (
    <View
      style={{
        alignSelf: "center",
        justifyContent: "center",
        marginTop: marginTop || 120,
        padding: 20,
      }}
    >
      <Image
        source={Images?.noShowImage}
        style={{ height: 140, width: 140, alignSelf: "center" }}
      />
      <CustomText
        textAlign={"center"}
        alignSelf={"center"}
        fontSize={18}
        fontFamily={fonts.bold}
        label={label}
      />
      <CustomText
        textAlign={"center"}
        alignSelf={"center"}
        fontSize={14}
        fontFamily={fonts.regular}
        label={label2}
      />
    </View>
  );
};

export default NoShow;

const styles = StyleSheet.create({});
