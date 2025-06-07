import { StyleSheet, Dimensions, Animated, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";

import { setOnBoarding } from "../../../store/reducer/AuthConfig";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const array = [
    {
      id: 1,
      img: Images.onBoarding1,
    },
    {
      id: 2,
      img: Images.onBoarding2,
    },
  ];
  useEffect(() => {
    flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  }, [currentIndex]);

  return (
    <ScreenWrapper paddingHorizontal={0.1}>
      <View style={styles.container}>
        <View style={className("flex align-center justify-between")}>
          <Animated.View style={styles.dotContainer}>
            {array?.map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      i == currentIndex ? COLORS.primaryColor : COLORS.white,
                  },
                ]}
              />
            ))}
          </Animated.View>
          <CustomText
            label={"Skip"}
            fontSize={12}
            color={COLORS.white}
            onPress={() => {
              navigation.replace("GetStarted");
              dispatch(setOnBoarding(true));
            }}
          />
        </View>

        <CustomText
          label={currentIndex == 0 ? "onBoarding1" : "onBoarding2"}
          fontSize={20}
          marginBottom={6}
          lineHeight={34}
          fontFamily={fonts.bold}
          color={COLORS.white}
        />
        <CustomText
          label={currentIndex == 0 ? "onBoarding1Desc" : "onBoarding2Desc"}
          fontSize={16}
          color={COLORS.white}
          letterSpacing={0.2}
        />
      </View>
      <Animated.FlatList
        data={array}
        showsHorizontalScrollIndicator={false}
        horizontal
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          console.error("Failed to scroll to index:", info.index);
        }}
        ref={flatListRef}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex((x / width)?.toFixed(0));
        }}
        initialScrollIndex={currentIndex}
        pagingEnabled
        renderItem={({ item }) => (
          <Animated.View style={styles.sliderItem}>
            <Animated.Image style={styles.img} source={item.img} />
          </Animated.View>
        )}
      />

      <View style={{ padding: 20 }}>
        <CustomButton
          marginBottom={20}
          title={currentIndex == 1 ? "Get Started" : "Next"}
          onPress={
            currentIndex == 1
              ? async () => {
                  navigation.replace("GetStarted");
                  dispatch(setOnBoarding(true));
                }
              : async () => {
                  setCurrentIndex((pre) => parseInt(pre) + 1);
                }
          }
        />
      </View>
    </ScreenWrapper>
  );
};
export default OnBoarding;
const styles = StyleSheet.create({
  sliderItem: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: "60%",
    width: "60%",
    resizeMode: "contain",
  },
  dot: {
    height: 10,
    width: 10,
    marginHorizontal: 3,
    borderRadius: 100,
  },
  container: {
    width: width,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  dotContainer: {
    flexDirection: "row",

    marginBottom: 30,
  },
});
