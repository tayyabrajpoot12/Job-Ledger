import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';
import Icons from './Icons';

const Header = ({title, isBack = true}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      {isBack && (
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Icons
            size={20}
            family={'Entypo'}
            color={COLORS.black}
            name={'chevron-thin-left'}
          />
        </TouchableOpacity>
      )}
      <CustomText
        label={title}
        fontSize={17}
        fontFamily={fonts.semiBold}
        color={COLORS.black}
        textAlign={'center'}
        alignSelf={'center'}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  back: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
  },
});
