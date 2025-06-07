/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "react-native";
import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";

const SearchBar = ({
  placeHolder,
  value,
  onChangeText,
  onEndEditing,
  editable = true,
  onFocus,
  autoFocus,
  marginTop,
  containerStyle,
  marginBottom,
  onSearchPress = () => "",
}) => {
  return (
    <>
      <View
        style={[
          {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: marginTop,
            marginBottom: marginBottom,
            backgroundColor: COLORS.secondaryColor,
            borderRadius: 8,
            overflow: "hidden",
          },
          containerStyle,
        ]}
      >
        <Pressable onPress={onSearchPress} style={[styles.container]}>
          <TouchableOpacity onPress={onSearchPress}>
            <Image
              source={Images.search}
              style={{ height: 17, width: 17 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!editable ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onSearchPress}
              style={styles.placeHolder}
            >
              <CustomText label={placeHolder} />
            </TouchableOpacity>
          ) : (
            <TextInput
              autoFocus={autoFocus}
              editable={editable}
              onFocus={onFocus}
              placeholder={placeHolder}
              placeholderTextColor={"#fff"}
              style={[styles.input, { color: COLORS.white }]}
              value={value}
              onChangeText={onChangeText}
              onEndEditing={onEndEditing}
              cursorColor={"#A9A9A9"}
            />
          )}
        </Pressable>
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 46,
    flex: 1,
  },
  input: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.regular,
    flex: 1,
    lineHeight: 22,
    marginLeft: Platform.OS === "android" ? 6 : 10,
    top: Platform.OS === "android" ? 0.5 : 0,
    zIndex: 1,
    height: 46,
  },
  dropdownMainContainer: {
    width: "20%",
    maxHeight: 200,
    overflow: "scroll",
    borderRadius: 4,

    alignSelf: "flex-end",
    marginTop: 6,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontFamily: fonts.medium,
  },
  placeHolder: {
    marginLeft: 10,
    flex: 1,
    height: 46,
    justifyContent: "center",
  },
});
