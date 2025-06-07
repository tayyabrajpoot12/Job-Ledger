import { StyleSheet, TouchableOpacity, View } from "react-native";

import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";

const TopTab = ({ tab, setTab, tabNames, count }) => {
  return (
    <View style={styles.mainContainer}>
      {tabNames.map((tabName, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setTab(tabName);
          }}
          style={[
            styles.item,
            tab === tabName ? styles.activeTab : styles.inActiveTab,
          ]}
          activeOpacity={0.8}
        >
          <CustomText
            fontSize={12}
            label={tabName}
            alignSelf={"center"}
            textTransform="capitalize"
            fontFamily={fonts.medium}
            color={tab === tabName ? "#000" : COLORS.white}
          />
          {index === 2 && count && count > 0 ? (
            <CustomText
              fontSize={12}
              alignSelf={"center"}
              label={` (${count})`}
              color={tab === tabName ? "#000" : COLORS.white}
            />
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 6,
    marginVertical: 8,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingTop: 9,
    paddingBottom: 7.5,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  inActiveTab: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 99,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    borderRadius: 99,
  },
  indicator: {
    width: "90%",
    height: 3,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    marginTop: 3,
  },
});
