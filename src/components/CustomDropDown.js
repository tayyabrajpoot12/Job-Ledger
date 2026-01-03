import React, {useState} from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import CustomText from './CustomText';
import Icons from './Icons';
import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomDropdown = ({
  data,
  value,
  setValue,
  showIcon,
  placeholder,
  error,
  withLabel,
}) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const selectOption = option => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (option?._id) {
      setValue(option?._id);
      setText(option.title);
    } else {
      setValue(option);
    }
    setIsOpen(false);
  };

  return (
    <>
      {withLabel && (
        <CustomText
          label={withLabel}
          fontFamily={fonts.medium}
          marginBottom={8}
          color={COLORS.inputLabel}
        />
      )}
      <View
        style={[
          styles.dropdownMainContainer,
          {
            marginBottom: error ? 5 : 15,
            borderColor: error ? COLORS.red : COLORS.lightGray,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.container}
          onPress={toggleDropdown}>
          <CustomText
            alignSelf={'center'}
            label={text || value || placeholder}
            color={value?.length ? COLORS.black : COLORS.gray}
          />
          {!showIcon ? (
            <Icons
              style={{color: COLORS.gray, fontSize: 20}}
              family="Entypo"
              name={isOpen ? 'chevron-up' : 'chevron-down'}
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>

        {isOpen && data?.length > 0 && (
          <ScrollView
            scrollEnabled
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            {data?.map((option, i) => (
              <TouchableOpacity
                style={styles.list}
                key={i}
                onPress={() => selectOption(option)}>
                <CustomText
                  label={option?._id ? option.title : option}
                  fontSize={12}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      {error && (
        <CustomText
          label={error}
          color={COLORS.red}
          fontFamily={fonts.semiBold}
          fontSize={10}
          marginBottom={15}
        />
      )}
    </>
  );
};

export default CustomDropdown;
const styles = StyleSheet.create({
  dropdownMainContainer: {
    width: '100%',
    maxHeight: 200,
    overflow: 'scroll',
    borderWidth: 1,
    borderColor: COLORS.red,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
    overflow: 'scroll',
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontFamily: fonts.medium,
  },
});
