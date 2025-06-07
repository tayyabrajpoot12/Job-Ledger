import { StyleSheet, View } from "react-native";
import fonts from "../assets/fonts";
import { className } from "../global-styles";
import { COLORS } from "../utils/COLORS";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import CustomText from "./CustomText";

const ConfirmationModal = ({
  isVisible,
  onDisable,
  title,
  desc,
  loading,
  onPress,
  heading,
}) => {
  return (
    <CustomModal isVisible={isVisible} onDisable={onDisable}>
      <View style={[styles.mainContainer, { backgroundColor: COLORS.black }]}>
        <CustomText
          label={heading || "Please Wait!"}
          fontSize={20}
          fontFamily={fonts.medium}
          alignSelf={"center"}
          textAlign={"center"}
          textTransform={"capitalize"}
          marginBottom={10}
        />
        <CustomText
          label={desc}
          fontSize={12}
          textAlign={"center"}
          alignSelf={"center"}
          marginTop={8}
          marginBottom={12}
        />

        <View style={[className("align-center mt-2"), { width: "100%" }]}>
          <CustomButton
            title={title}
            marginBottom={10}
            onPress={onPress}
            customText={{ fontFamily: fonts.medium }}
            customStyle={[className("bg-red h-12")]}
            loading={loading}
            disabled={loading}
            color={"#fff"}
            indicatorcolor={"#fff"}
          />
          <CustomButton
            title="Cancel"
            marginBottom={10}
            customText={{ fontFamily: fonts.medium }}
            onPress={onDisable}
            color={"#fff"}
            customStyle={[
              className(" h-12"),
              { backgroundColor: COLORS.black },
            ]}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 28,
    marginHorizontal: 24,
    marginBottom: 6,
    paddingTop: 26,
    alignItems: "center",
  },
});
